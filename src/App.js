import React, { useState } from "react";

const rarities = [
  "2009", "uncommon", "rare", "epic", "black_uncommon", "black_rare",
  "black_epic", "palindrome", "jan2009", "vintage", "nakamoto", "pizza", 
  "jpeg", "hitman", "silkroad", "alpha", "omega", "1_digit", "2_digits", 
  "3_digits", "perfect_palinception", "uniform_palinception", "rodarmor", 
  "450x", "block_9", "block_78", "block_286", "block_666", "fibonacci", 
  "sequence_palindrome", "legacy"
];

const App = () => {
  const [selectedRarities, setSelectedRarities] = useState([]);
  const [apiResults, setApiResults] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedRarities((prevState) => {
      if (prevState.includes(value)) {
        return prevState.filter((item) => item !== value);
      } else {
        return [...prevState, value];
      }
    });
  };

  const handleQueryClick = () => {
    if (selectedRarities.length === 0) {
      setError("Please select at least one rarity.");
      return;
    }

    const query = selectedRarities.join(",");
    const apiUrl = `https://api.deezy.io/v1/sat-hunting/circulation?rarity=${query}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          // Handle specific error messages from the API
          setError(data.message);
          setApiResults(null); // Clear previous results
        } else {
          // Successful response
          setApiResults(data.data);
          setError(null); // Clear any previous errors
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
        setApiResults(null); // Clear previous results
      });
  };

  return (
    <div>
      <h1>Select Rarities</h1>
      <form>
        {rarities.map((rarity) => (
          <div key={rarity}>
            <input
              type="checkbox"
              id={rarity}
              value={rarity}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={rarity}>{rarity}</label>
          </div>
        ))}
      </form>
      <button onClick={handleQueryClick}>Query</button>

      {/* Display Error Message */}
      {error && <div style={{ color: "red" }}><strong>Error:</strong> {error}</div>}

      {/* Display API Response */}
      {apiResults && (
        <div>
          <h2>Results</h2>
          <p><strong>Total:</strong> {apiResults.n_total}</p>
          <p><strong>Mined:</strong> {apiResults.n_mined}</p>
          <p><strong>Epoch:</strong> {apiResults.n_epoch}</p>
          <p><strong>365 Days:</strong> {apiResults.n_365}</p>
          <p><strong>Sequence:</strong> {apiResults.n_seq}</p>
          <p><strong>Inscribed:</strong> {apiResults.n_inscribed}</p>
          <p><strong>Sequence Holders:</strong> {apiResults.n_seq_holders}</p>
          <p><strong>Total Holders:</strong> {apiResults.n_total_holders}</p>
          <p><strong>Updated At:</strong> {new Date(apiResults.updated_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default App;