import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './App.css'; // Add a CSS file for additional styling

const rarities = {
  RRI: ["uncommon", "rare", "epic"],
  Black: ["black_uncommon", "black_rare", "black_epic"],
  Historical: ["450x", "block_9", "jan2009", "2009", "vintage", "block_78", "block_286", "block_666", "nakamoto"],
  Type: ["palindrome", "alpha", "omega"],
  Events: ["pizza", "jpeg", "hitman", "silkroad"],
  Palindrome: ["1_digit", "2_digits", "3_digits", "perfect_palinception", "uniform_palinception", "sequence_palindrome"],
  Other: ["paliblock", "rodarmor", "fibonacci", "legacy"],
  Epochs: ["epoch0", "epoch1", "epoch2", "epoch3", "epoch4"],
};

const App = () => {

  useEffect(() => {
    document.title = "Rare Stats";
  }, []);

  const [selectedRarities, setSelectedRarities] = useState([]);
  const [apiResults, setApiResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    // Retrieve dark mode preference from localStorage, default to false if not set
    return localStorage.getItem("darkMode") === "true";
  });

  // Apply dark mode class to the body on state change
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    // Save the dark mode preference in localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Format numbers for readability
  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  // Calculate Sat score
  const calculateSatScore = (S, M, A, F, FH) => {
    const S_max = 2.1 * Math.pow(10, 15); // 2.1 quadrillion
    const logS_max = Math.log(S_max);
    const logS = Math.log(S);
    const logM = Math.log(M);

    const AF_avg = (A + F)/2;
    const AF_avg_n = AF_avg > 1 ? AF_avg : 1;

    const Sc = (logS / logS_max);
    const AFc = Math.log(AF_avg_n) / logM;
    const Hc = (1 - (FH / F)) > 0 ? (1 - (FH / F)) : 0.01;  // Impact of holders relative to supply

    const Sci = 1 - Sc;
    const AFci = 1 - AFc;
    const Hci = 1 - Hc;

    // Calculate score using the formula
    const score = 1000 * (1 - Sc * AFc * Hc);

    // Apply power law transformation to the score
    const alpha = 1.5;
    const power_transformed_score = Math.pow(score / 1000, alpha) * 1000;

    return { score, power_transformed_score, Sc, AFc, Hc, Sci, AFci, Hci };
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
  
    if (value.startsWith("epoch")) {
      // const epochNumber = parseInt(value.replace("epoch", ""));
      const newSelections = selectedRarities.includes(value)
        ? selectedRarities.filter((item) => item !== value)
        : [...selectedRarities, value];
  
      // Validation: Ensure epoch continuity
      const selectedEpochs = newSelections.filter((item) => item.startsWith("epoch"));
      for (let i = 0; i < selectedEpochs.length - 1; i++) {
        const current = parseInt(selectedEpochs[i].replace("epoch", ""));
        const next = parseInt(selectedEpochs[i + 1].replace("epoch", ""));
        if (next !== current + 1) {
          alert("You cannot skip epochs. Select them in order.");
          return;
        }
      }
  
      setSelectedRarities(newSelections);
    } else {
      setSelectedRarities((prevState) =>
        prevState.includes(value)
          ? prevState.filter((item) => item !== value)
          : [...prevState, value]
      );
    }
  };

  const handleClearClick = () => {
    setSelectedRarities([]);
    setApiResults(null);
    setError(null);
  };

  const handleQueryClick = () => {
    if (selectedRarities.length === 0) {
      setError("Please select at least one rarity.");
      return;
    }

    // Calculate block_start and block_end
    const selectedEpochs = selectedRarities.filter((item) => item.startsWith("epoch"));
    const block_start = selectedEpochs.length > 0
      ? parseInt(selectedEpochs[0].replace("epoch", "")) * 210000
      : undefined;
    const block_end = selectedEpochs.length > 0
      ? (parseInt(selectedEpochs[selectedEpochs.length - 1].replace("epoch", "")) + 1) * 210000
      : undefined;

    const query = selectedRarities.filter((item) => !item.startsWith("epoch")).join(",");
    let apiUrl = `https://api.deezy.io/v1/sat-hunting/circulation?rarity=${query}`;
    if (block_start !== undefined && block_end !== undefined) {
      apiUrl += `&block_start=${block_start}&block_end=${block_end}`;
    }

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

          // Save the query and results in localStorage
          const satScore = calculateSatScore(data.data.n_total, data.data.n_mined, data.data.n_365, data.data.n_seq, data.data.n_seq_holders);

          if(data.data.n_total > 0 && satScore.score) {
            const queryData = {
              query: selectedRarities,
              result: data.data,
              satScore: satScore,
            };

            // Get existing queries from localStorage
            const savedQueries = JSON.parse(localStorage.getItem('queries')) || [];

            // Prevent duplicates by checking if the query already exists
            const isDuplicate = savedQueries.some(item => item.query.join(",") === selectedRarities.join(","));
            if (!isDuplicate) {
              savedQueries.push(queryData);
              localStorage.setItem('queries', JSON.stringify(savedQueries));
            }
          }
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

  const renderCategory = (category, items, borderColor) => {
    // Tooltips for epochs
    const epochTooltips = {
      epoch0: "Jan 3, 2009 – Nov 28, 2012",  // Genesis block to first halving
      epoch1: "Nov 28, 2012 – Jul 9, 2016",  // First to second halving
      epoch2: "Jul 9, 2016 – May 11, 2020",  // Second to third halving
      epoch3: "May 11, 2020 – Apr 20, 2024", // Third to fourth halving
      epoch4: "Apr 20, 2024 – Mar 26, 2028", // Fourth to fifth halving
    };
  
    return (
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
        <h5
          style={{
            color: category === "Black" && darkMode ? "#FFFFFF" : borderColor,
            marginBottom: "5px",
          }}
        >
          {category}
        </h5>
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
              <label
                htmlFor={item}
                style={{ marginLeft: "5px" }}
                title={epochTooltips[item] || ""}
              >
                {item}
              </label>
            </div>
          ))}
        </div>

      {/* Add small block for mobile */}
      {category === "Epochs" && (
        <div
          className="d-block d-md-none mt-2"
          style={{
            fontSize: "0.9rem",
            color: darkMode ? "#FFFFFF" : "#000000",
            background: darkMode ? "#2A2D34" : "#F8F9FA",
            padding: "5px",
            borderRadius: "5px",
            border: `1px solid ${borderColor}`,
          }}
        >
          {Object.entries(epochTooltips).map(([epoch, range]) => (
            <p key={epoch} style={{ margin: 0 }}>
              <strong>{epoch}:</strong> {range}
            </p>
          ))}
        </div>
      )}
      </div>

    );
  };

  // Get saved queries from localStorage
  const savedQueries = JSON.parse(localStorage.getItem('queries')) || [];

  // Sort the saved queries by Sat score
  const sortedQueries = savedQueries.sort((a, b) => b.satScore.score - a.satScore.score);

  return (
    <div className={`container mt-5 ${darkMode ? 'dark-mode-container' : ''}`}>
      {/* Dark mode toggle button */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span className={darkMode ? "text-light" : "text-dark"} style={{ fontWeight: "bold" }}>
          {darkMode ? "Switch To Light" : "Switch To Dark"} Mode
        </span>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <span className="slider"></span>
        </label>
      </div>

      <h1 className={`text-center mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>Select Rarities</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px", // Minimized space between categories
        }}
      >
        {renderCategory("Rodarmor Rarity", rarities.RRI, "#EF476F")}          {/* Coral Red */}
        {renderCategory("Black", rarities.Black, "#2A2D34")}      {/* Charcoal Gray */}
        {renderCategory("Other types", rarities.Type, "#FFD166")}        {/* Goldenrod Yellow */}
        {renderCategory("Historical", rarities.Historical, "#118AB2")} {/* Azure Blue */}
        {renderCategory("Events", rarities.Events, "#06D6A0")}    {/* Mint Green */}
        {renderCategory("Palindrome", rarities.Palindrome, "#8ECAE6")} {/* Sky Blue */}
        {renderCategory("Other", rarities.Other, "#9D4EDD")}      {/* Violet Purple */}
        {renderCategory("Halving epochs", rarities.Epochs, "#FFB703")} {/* Epoch color */}
      </div>

      <div className="text-center mb-4">
        <button className="btn btn-primary mt-3" onClick={handleQueryClick}>
          Query
        </button>
        <button className="btn btn-secondary mt-3 ms-2" onClick={handleClearClick}>
          Clear
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
        <div className="my-4">
          <h2 className={`mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>Results</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {[
              { label: "Total", value: formatNumber(apiResults.n_total) },
              { label: "Mined", value: formatNumber(apiResults.n_mined) },
              { label: "Active Epoch", value: formatNumber(apiResults.n_epoch) },
              { label: "Active 365 Days", value: formatNumber(apiResults.n_365) },
              { label: "Found", value: formatNumber(apiResults.n_seq) },
              { label: "Inscribed", value: formatNumber(apiResults.n_inscribed) },
              { label: "Holders (Found)", value: formatNumber(apiResults.n_seq_holders) },
              { label: "Holders (Total)", value: formatNumber(apiResults.n_total_holders) },
              {
                label: "Updated At",
                value: new Date(apiResults.updated_at).toLocaleString(),
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: darkMode ? "#2A2D34" : "#F8F9FA",
                  color: darkMode ? "#FFFFFF" : "#000000",
                  border: darkMode ? "1px solid #444" : "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  textAlign: "center",
                  width: "calc(33.33% - 20px)", // Three items per row with gap
                  minWidth: "200px",
                  boxShadow: darkMode
                    ? "0 4px 6px rgba(0, 0, 0, 0.3)"
                    : "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h5
                  style={{
                    marginBottom: "10px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  {item.label}
                </h5>
                <p style={{ fontSize: "1.2rem", margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display Sat Score if available */}
      {apiResults && (
        <>

          <div className="mt-5">
            {/* Sat Score and Gauges on the Same Line */}
            <div className="d-flex align-items-center justify-content-around mt-4">
              {/* Sat Score */}
              <div>
                <h3>Sat Score: {calculateSatScore(apiResults.n_total, apiResults.n_mined, apiResults.n_365, apiResults.n_seq, apiResults.n_seq_holders).power_transformed_score.toFixed(2)}</h3>
              </div>

              {/* Gauges */}
              <div className="d-flex">
                {/* Gauge for logS / logS_max */}
                <div style={{ margin: "0 10px", textAlign: "center" }}>
                  <CircularProgressbar
                    value={calculateSatScore(apiResults.n_total, apiResults.n_mined, apiResults.n_365, apiResults.n_seq, apiResults.n_seq_holders).Sci * 100}
                    text={`${(calculateSatScore(apiResults.n_total, apiResults.n_mined, apiResults.n_365, apiResults.n_seq, apiResults.n_seq_holders).Sci * 100).toFixed(0)} pt.`}
                    styles={buildStyles({
                      textColor: "#EF476F",
                      pathColor: "#EF476F",
                      trailColor: "#d6d6d6",
                    })}
                  />
                  <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>Supply</p>
                </div>

                {/* Gauge for AFci */}
                <div style={{ margin: "0 10px", textAlign: "center" }}>
                  <CircularProgressbar
                    value={Math.pow(calculateSatScore(apiResults.n_total, apiResults.n_mined, apiResults.n_365, apiResults.n_seq, apiResults.n_seq_holders).AFci, 1/3) * 100}
                    text={`${(Math.pow(calculateSatScore(apiResults.n_total, apiResults.n_mined, apiResults.n_365, apiResults.n_seq, apiResults.n_seq_holders).AFci, 1/3) * 100).toFixed(0)} pt.`}
                    styles={buildStyles({
                      textColor: "#06D6A0",
                      pathColor: "#06D6A0",
                      trailColor: "#d6d6d6",
                    })}
                  />
                  <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>Active+Found</p>
                </div>

                {/* Gauge for Hci */}
                <div style={{ margin: "0 10px", textAlign: "center" }}>
                  <CircularProgressbar
                    value={Math.pow(calculateSatScore(apiResults.n_total, apiResults.n_mined, apiResults.n_365, apiResults.n_seq, apiResults.n_seq_holders).Hci, 1/3) * 100}
                    text={`${(Math.pow(calculateSatScore(apiResults.n_total, apiResults.n_mined, apiResults.n_365, apiResults.n_seq, apiResults.n_seq_holders).Hci, 1/3) * 100).toFixed(0)} pt.`}
                    styles={buildStyles({
                      textColor: "#118AB2",
                      pathColor: "#118AB2",
                      trailColor: "#d6d6d6",
                    })}
                  />
                  <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>Holders</p>
                </div>
              </div>
            </div>

            <p><strong>What is the Sat Score?</strong></p>
            <p>
              The <strong>Sat score</strong> is a unique metric (developed by AI) that provides a numerical representation of the relative rarity of a given sat.
              It is calculated using:
            </p>
            <ul>
              <li><strong>Smax</strong> - The total number of sats in existence (2.1 quadrillion).</li>
              <li><strong>S (n_total)</strong> - The total number of selected sats.</li>
              <li><strong>M (n_mined)</strong> - The number of mined sats.</li>
              <li><strong>A (n_365)</strong> - The number of sats active over the past 365 days.</li>
              <li><strong>F (n_seq)</strong> - The number of sats that are found.</li>
              <li><strong>FH (n_seq_holders)</strong> - The number of holders of sats that are found.</li>
            </ul>
            <p>Note that the Sat score is logarithmic, meaning the resulting scores cannot be directly compared. For example, a score of 800 is not twice as rare as 400; it is significantly rarer, but the relationship is not linear.</p>
            <p>
              Additionally, creating your own scores based on different factors or data points that are important to you is encouraged. Custom scores can provide a more tailored understanding of rarity in your specific context.
            </p>
            <p><strong>Why is it useful?</strong></p>
            <p>The Sat score helps users quickly gauge the rarity and significance of specific sat without having to manually interpret large sets of numbers. By looking at the Sat score, you can get a clearer sense of how valuable or noteworthy an item might be, especially when comparing multiple items.</p>

            <p><strong>Formula:</strong></p>
            <div style={{ fontSize: '1.2rem', fontFamily: 'Courier, monospace', lineHeight: '1.6' }}>
              PowerLaw(1000 × ( 1 - 
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '0 5px' }}>
                  <div>log(S)</div>
                  <div style={{ borderTop: '1px solid black', padding: '0 5px' }}>log(S<sub>max</sub>)</div>
                </span>
                ×
                <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '0 5px' }}>
                  <div>log(Avg(A,F))</div>
                  <div style={{ borderTop: '1px solid black', padding: '0 5px' }}>log(M)</div>
                </span>
                ×
                <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', margin: '0 5px' }}>
                  <div>(1 - (FH / F))</div>
                </span>
              </span>
              ))
            </div>

            <p><strong>Disclaimer:</strong> Please note that the Sat score is an <strong>arbitrary</strong> calculation based on the dataset, and its value can change as the data updates or as new factors are added to the formula. It is not a definitive or static measure of value but rather a tool to assist in understanding the relative importance of items within the dataset.</p>
          </div>
        </>
      )}

      {/* Query History Table */}
      <div className="mt-4">
      <h3 className={darkMode ? "text-light" : "text-dark"}>Query History</h3>
      <div
        style={{
          overflowX: "auto", // Enable horizontal scrolling if needed
          width: "100%",     // Ensure the container fits within the screen width
        }}
      >
        <table
          className={`table ${darkMode ? "table-dark" : "table-light"} table-striped`}
          style={{
            border: darkMode ? "1px solid #444" : "1px solid #ddd",
            minWidth: "800px", // Ensure the table is readable on smaller screens
          }}
        >
          <thead>
            <tr>
              <th>Query</th>
              <th>Supply</th>
              <th>Mined</th>
              <th>Actv<sub>365</sub></th>
              <th>Found</th>
              <th>H<sub>fnd</sub></th>
              <th>H<sub>ttl</sub></th>
              <th>%Actv<sub>365</sub></th>
              <th>%Fnd</th>
              <th>S<sub>ci</sub></th>
              <th>AF<sub>ci</sub></th>
              <th>H<sub>ci</sub></th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedQueries.map((queryData, index) => (
              <tr key={index}>
                <td>{queryData.query.join(", ")}</td>
                <td>{formatNumber(queryData.result.n_total)}</td>
                <td>{formatNumber(queryData.result.n_mined)}</td>
                <td>{formatNumber(queryData.result.n_365)}</td>
                <td>{formatNumber(queryData.result.n_seq)}</td>
                <td>{formatNumber(queryData.result.n_seq_holders)}</td>
                <td>{formatNumber(queryData.result.n_total_holders)}</td>
                <td>{((queryData.result.n_365 / queryData.result.n_mined) * 100).toFixed(1)}%</td>
                <td>{((queryData.result.n_seq / queryData.result.n_mined) * 100).toFixed(1)}%</td>
                <td>{queryData.satScore.Sci.toFixed(2)}</td>
                <td>{queryData.satScore.AFci.toFixed(2)}</td>
                <td>{queryData.satScore.Hci.toFixed(2)}</td>
                <td>{queryData.satScore.power_transformed_score.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show Clear Query History Button Only If There Is History */}
      {sortedQueries.length > 0 && (
        <div className="text-center mt-3">
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("queries");
              setApiResults(null); // Clear the API results state
              setError(null);      // Clear any existing error state
              window.location.reload(); // Reload the page to refresh the table
            }}
          >
            Clear Query History
          </button>
        </div>
      )}

      </div>

      {/* Legal Disclaimer */}
      <footer className="mt-5 text-center text-muted">
        <p><small><strong>Disclaimer:</strong> This page uses data provided by the API at <a href="https://api.deezy.io" target="_blank" rel="noopener noreferrer">https://api.deezy.io</a>. The data is provided "as is," and the creator of this page does not profit from its use. <strong>This is not financial advice. Use the data at your own risk.</strong></small></p>
      </footer>
    </div>
  );
};

export default App;
