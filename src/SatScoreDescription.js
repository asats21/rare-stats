import React from "react";

const SatScoreDescription = ({
  darkMode,
  setShowSatScore,
  showSatScore,
}) => {
  return (
    <div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "10px" }}>
        <h3 className={darkMode ? "text-light" : "text-dark"} style={{ margin: 0 }}>
          What is the Sat Score?
        </h3>
        <label
          className="switch-container"
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <span className={darkMode ? "text-light" : "text-dark"} style={{ fontSize: "1rem" }}>
            {showSatScore ? "Hide" : "Show"}
          </span>
          <label className="switch">
            <input
              type="checkbox"
              checked={showSatScore}
              onChange={() => setShowSatScore((prev) => !prev)}
            />
            <span className="slider"></span>
          </label>
        </label>
      </div>

      {showSatScore && (
        <div className="mt-3">
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
          <div
            style={{
              fontSize: "1.2rem",
              fontFamily: "Courier, monospace",
              lineHeight: "1.6",
            }}
          >
            PowerLaw(1000 × ( 1 -
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <span
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "0 5px",
                }}
              >
                <div>log(S)</div>
                <div
                  style={{
                    borderTop: `1px solid ${darkMode ? "#ffffff" : "#000000"}`, // Adjust for dark mode
                    padding: "0 5px",
                  }}
                >
                  log(S<sub>max</sub>)
                </div>
              </span>
              ×
              <span
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "0 5px",
                }}
              >
                <div>log(Avg(A,F))</div>
                <div
                  style={{
                    borderTop: `1px solid ${darkMode ? "#ffffff" : "#000000"}`, // Adjust for dark mode
                    padding: "0 5px",
                  }}
                >
                  log(M)
                </div>
              </span>
              ×
              <span
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "0 5px",
                }}
              >
                <div>(1 - (FH / F))</div>
              </span>
            </span>
            ))
          </div>
          <p><strong>Disclaimer:</strong> Please note that the Sat score is an <strong>arbitrary</strong> calculation based on the dataset, and its value can change as the data updates or as new factors are added to the formula. It is not a definitive or static measure of value but rather a tool to assist in understanding the relative importance of items within the dataset.</p>
        </div>
      )}
    </div>
  );
};

export default SatScoreDescription;
