import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const rarities = [
  "2009", "uncommon", "rare", "epic", "black_uncommon", "black_rare",
  "black_epic", "palindrome", "jan2009", "vintage", "nakamoto", "pizza", 
  "jpeg", "hitman", "silkroad", "alpha", "omega", "1_digit", "2_digits", 
  "3_digits", "perfect_palinception", "uniform_palinception", "rodarmor", 
  "450x", "block_9", "block_78", "block_286", "block_666", "fibonacci", 
  "sequence_palindrome", "legacy", "paliblock"
];

const App = () => {
  const [selectedRarities, setSelectedRarities] = useState([]);
  const [apiResults, setApiResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state

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
    
    setLoading(true); // Start loading

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
          setApiResults(null); // Clear previous results
        } else {
          setApiResults(data.data);
          setError(null); // Clear any previous errors
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
        setApiResults(null); // Clear previous results
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Select Rarities</h1>
      <div className="row mb-3">
        <div className="col-12">
          <form>
            {rarities.map((rarity) => (
              <div key={rarity} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={rarity}
                  value={rarity}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor={rarity}>
                  {rarity}
                </label>
              </div>
            ))}
          </form>
        </div>
      </div>
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={handleQueryClick}>
          Query
        </button>
      </div>

      {/* Display Spinner While Loading */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Display Error Message */}
      {error && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Display API Response */}
      {apiResults && (
        <div className="mt-4">
          <h2 className="mb-4">Results</h2>
          <div className="list-group">
            <p className="list-group-item"><strong>Total:</strong> {apiResults.n_total}</p>
            <p className="list-group-item"><strong>Mined:</strong> {apiResults.n_mined}</p>
            <p className="list-group-item"><strong>Epoch:</strong> {apiResults.n_epoch}</p>
            <p className="list-group-item"><strong>365 Days:</strong> {apiResults.n_365}</p>
            <p className="list-group-item"><strong>Found:</strong> {apiResults.n_seq}</p> {/* Changed to "Found" */}
            <p className="list-group-item"><strong>Inscribed:</strong> {apiResults.n_inscribed}</p>
            <p className="list-group-item"><strong>Found Holders:</strong> {apiResults.n_seq_holders}</p> {/* Changed to "Found Holders" */}
            <p className="list-group-item"><strong>Total Holders:</strong> {apiResults.n_total_holders}</p>
            <p className="list-group-item"><strong>Updated At:</strong> {new Date(apiResults.updated_at).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
