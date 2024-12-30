import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const rarities = {
  RRI: ["uncommon", "rare", "epic"],
  Black: ["black_uncommon", "black_rare", "black_epic"],
  Historical: ["450x", "block_9", "jan2009", "2009", "vintage", "block_78", "block_286", "block_666", "nakamoto"],
  Type: ["palindrome", "alpha", "omega"],
  Events: ["pizza", "jpeg", "hitman", "silkroad"],
  Palindrome: ["1_digit", "2_digits", "3_digits", "perfect_palinception", "uniform_palinception", "sequence_palindrome"],
  Other: ["paliblock", "rodarmor", "fibonacci", "legacy"],
};

const App = () => {
  const [selectedRarities, setSelectedRarities] = useState([]);
  const [apiResults, setApiResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Format numbers for readability
  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  // Calculate Sat score
  const calculateSatScore = (S, A, F) => {
    const S_max = 2.1 * Math.pow(10, 15); // 2.1 quadrillion
    const logS_max = Math.log(S_max);
    const logS = Math.log(S);
    const logF = Math.log(F);
    const logA = Math.log(A);

    const Sc = (logS / logS_max);
    const Ac = (logA / logS);
    const Fc = (logF / logS);

    const Sci = 1 - (logS / logS_max);
    const Aci = 1 - (logA / logS);
    const Fci = 1 - (logF / logS);

    // Calculate score using the formula
    const score = 1000 * (1 - Sc * Ac * Fc);
    return { score, Sc, Ac, Fc, Sci, Aci, Fci };
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedRarities((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value]
    );
  };

  const handleQueryClick = () => {
    if (selectedRarities.length === 0) {
      setError("Please select at least one rarity.");
      return;
    }

    const query = selectedRarities.join(",");
    const apiUrl = `https://api.deezy.io/v1/sat-hunting/circulation?rarity=${query}`;

    setLoading(true);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
          setApiResults(null);
        } else {
          setApiResults(data.data);
          setError(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
        setApiResults(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderCategory = (category, items, borderColor) => (
    <div
      style={{
        border: `2px solid ${borderColor}`,
        borderRadius: "10px",
        margin: "5px",
        padding: "10px",
        flex: "1 1 30%", // Adjust for a compact layout
        minWidth: "200px",
      }}
    >
      <h5 style={{ color: borderColor, marginBottom: "5px" }}>{category}</h5>
      <div className="d-flex flex-wrap">
        {items.map((item) => (
          <div key={item} style={{ marginRight: "10px", marginBottom: "5px" }}>
            <input
              type="checkbox"
              id={item}
              value={item}
              checked={selectedRarities.includes(item)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={item} style={{ marginLeft: "5px" }}>
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Select Rarities</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px", // Minimized space between categories
        }}
      >
        {renderCategory("RRI", rarities.RRI, "#EF476F")}          {/* Coral Red */}
        {renderCategory("Black", rarities.Black, "#2A2D34")}      {/* Charcoal Gray */}
        {renderCategory("Other types", rarities.Type, "#FFD166")}        {/* Goldenrod Yellow */}
        {renderCategory("Historical", rarities.Historical, "#118AB2")} {/* Azure Blue */}
        {renderCategory("Events", rarities.Events, "#06D6A0")}    {/* Mint Green */}
        {renderCategory("Palindrome", rarities.Palindrome, "#8ECAE6")} {/* Sky Blue */}
        {renderCategory("Other", rarities.Other, "#9D4EDD")}      {/* Violet Purple */}
      </div>

      <div className="text-center mb-4">
        <button className="btn btn-primary mt-3" onClick={handleQueryClick}>
          Query
        </button>
      </div>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
      )}

      {apiResults && (
        <div className="mt-4">
          <h2 className="mb-4">Results</h2>
          <div className="list-group">
            <p className="list-group-item"><strong>Total:</strong> {formatNumber(apiResults.n_total)}</p>
            <p className="list-group-item"><strong>Mined:</strong> {formatNumber(apiResults.n_mined)}</p>
            <p className="list-group-item"><strong>Epoch:</strong> {formatNumber(apiResults.n_epoch)}</p>
            <p className="list-group-item"><strong>365 Days:</strong> {formatNumber(apiResults.n_365)}</p>
            <p className="list-group-item"><strong>Found:</strong> {formatNumber(apiResults.n_seq)}</p>
            <p className="list-group-item"><strong>Inscribed:</strong> {formatNumber(apiResults.n_inscribed)}</p>
            <p className="list-group-item"><strong>Found Holders:</strong> {formatNumber(apiResults.n_seq_holders)}</p>
            <p className="list-group-item"><strong>Total Holders:</strong> {formatNumber(apiResults.n_total_holders)}</p>
            <p className="list-group-item"><strong>Updated At:</strong> {new Date(apiResults.updated_at).toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Display Sat Score if available */}
      {apiResults && (
        <>

          <hr />

          <div className="mt-4">
            {/* Sat Score and Gauges on the Same Line */}
            <div className="d-flex align-items-center justify-content-around mt-4">
              {/* Sat Score */}
              <div>
                <h3>Sat Score: {calculateSatScore(apiResults.n_total, apiResults.n_365, apiResults.n_seq).score.toFixed(2)}</h3>
              </div>

              {/* Gauges */}
              <div className="d-flex">
                {/* Gauge for logS / logS_max */}
                <div style={{ margin: "0 10px", textAlign: "center" }}>
                  <CircularProgressbar
                    value={calculateSatScore(apiResults.n_total, apiResults.n_365, apiResults.n_seq).Sci * 100}
                    text={`${(calculateSatScore(apiResults.n_total, apiResults.n_365, apiResults.n_seq).Sci * 100).toFixed(0)} pt.`}
                    styles={buildStyles({
                      textColor: "#EF476F",
                      pathColor: "#EF476F",
                      trailColor: "#d6d6d6",
                    })}
                  />
                  <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>S - Supply</p>
                </div>

                {/* Gauge for logA / logS */}
                <div style={{ margin: "0 10px", textAlign: "center" }}>
                  <CircularProgressbar
                    value={calculateSatScore(apiResults.n_total, apiResults.n_365, apiResults.n_seq).Aci * 100}
                    text={`${(calculateSatScore(apiResults.n_total, apiResults.n_365, apiResults.n_seq).Aci * 100).toFixed(0)} pt.`}
                    styles={buildStyles({
                      textColor: "#06D6A0",
                      pathColor: "#06D6A0",
                      trailColor: "#d6d6d6",
                    })}
                  />
                  <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>A - Active 365</p>
                </div>

                {/* Gauge for logF / logS */}
                <div style={{ margin: "0 10px", textAlign: "center" }}>
                  <CircularProgressbar
                    value={calculateSatScore(apiResults.n_total, apiResults.n_365, apiResults.n_seq).Fci * 100}
                    text={`${(calculateSatScore(apiResults.n_total, apiResults.n_365, apiResults.n_seq).Fci * 100).toFixed(0)} pt.`}
                    styles={buildStyles({
                      textColor: "#118AB2",
                      pathColor: "#118AB2",
                      trailColor: "#d6d6d6",
                    })}
                  />
                  <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>F - Found</p>
                </div>
              </div>
            </div>

            <p><strong>What is the Sat Score?</strong></p>
            <p>
              The <strong>Sat score</strong> is a unique metric (developed by AI) that provides a numerical representation of the relative rarity of a given sat.
              It is calculated using four key data points:
            </p>
            <ul>
              <li><strong>Smax</strong> - The total number of sats in existence (2.1 quadrillion).</li>
              <li><strong>S (n_total)</strong> - The total number of selected sats.</li>
              <li><strong>A (n_365)</strong> - The number of sats active over the past 365 days.</li>
              <li><strong>F (n_seq)</strong> - The number of sats that are found.</li>
            </ul>
            <p>Note that the Sat score is logarithmic, meaning the resulting scores cannot be directly compared. For example, a score of 800 is not twice as rare as 400; it is significantly rarer, but the relationship is not linear.</p>
            <p>
              Additionally, creating your own scores based on different factors or data points that are important to you is encouraged. Custom scores can provide a more tailored understanding of rarity in your specific context.
            </p>
            <p><strong>Why is it useful?</strong></p>
            <p>The Sat score helps users quickly gauge the rarity and significance of specific sat without having to manually interpret large sets of numbers. By looking at the Sat score, you can get a clearer sense of how valuable or noteworthy an item might be, especially when comparing multiple items.</p>

            <p><strong>Formula:</strong></p>
            <div style={{ fontSize: '1.2rem', fontFamily: 'Courier, monospace', lineHeight: '1.6' }}>
              1000 × ( 1 - 
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '0 5px' }}>
                  <div>log(S)</div>
                  <div style={{ borderTop: '1px solid black', padding: '0 5px' }}>log(S<sub>max</sub>)</div>
                </span>
                ×
                <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '0 5px' }}>
                  <div>log(A)</div>
                  <div style={{ borderTop: '1px solid black', padding: '0 5px' }}>log(S)</div>
                </span>
                ×
                <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '0 5px' }}>
                  <div>log(F)</div>
                  <div style={{ borderTop: '1px solid black', padding: '0 5px' }}>log(S)</div>
                </span>
              </span>
              )
            </div>

            <p><strong>Disclaimer:</strong> Please note that the Sat score is an <strong>arbitrary</strong> calculation based on the dataset, and its value can change as the data updates or as new factors are added to the formula. It is not a definitive or static measure of value but rather a tool to assist in understanding the relative importance of items within the dataset.</p>
          </div>
        </>
      )}

      {/* Legal Disclaimer */}
      <footer className="mt-5 text-center text-muted">
        <p><small><strong>Disclaimer:</strong> This page uses data provided by the API at <a href="https://api.deezy.io" target="_blank" rel="noopener noreferrer">https://api.deezy.io</a>. The data is provided "as is," and the creator of this page does not profit from its use. <strong>This is not financial advice. Use the data at your own risk.</strong></small></p>
      </footer>
    </div>
  );
};

export default App;