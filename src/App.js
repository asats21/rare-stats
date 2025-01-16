import React, { useState, useEffect, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './App.css'; // Add a CSS file for additional styling
import { FaCog } from "react-icons/fa"; // Install react-icons if not already installed

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
  const [queriedRarities, setQueriedRarities] = useState([]);
  const [apiResults, setApiResults] = useState(null);
  const [apiQueryUrl, setApiQueryUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [floorPrice, setFloorPrice] = useState("");
  // State to track if Recommend Me triggered the query
  const [recommendTriggered, setRecommendTriggered] = useState(false);

  const [blockNumber, setBlockNumber] = useState('');

  const [trailingZeroes, setTrailingZeroes] = useState(""); // For the number input
  const isUncommonSelected = selectedRarities.includes("uncommon"); // Check if "Uncommon" is selected

  const [showSettings, setShowSettings] = useState(false);
  const [showTopHolders, setShowTopHolders] = useState(
    JSON.parse(localStorage.getItem("showTopHolders")) || false
  );
  const [showTopHoldersFound, setShowTopHoldersFound] = useState(
    JSON.parse(localStorage.getItem("showTopHoldersFound")) || false
  );

  const [showBlockNumberInput, setShowBlockNumberInput] = useState(
    JSON.parse(localStorage.getItem("showBlockNumberInput")) || false
  );

  const [showFeelingLucky, setShowFeelingLucky] = useState(
    JSON.parse(localStorage.getItem("showFeelingLucky")) ?? true
  );

  const [showSatScoreComponents, setShowSatScoreComponents] = useState(
    JSON.parse(localStorage.getItem("showSatScoreComponents")) || false
  );

  const [darkMode, setDarkMode] = useState(() => {
    // Retrieve dark mode preference from localStorage, default to true if not set
    const storedPreference = localStorage.getItem("darkMode");
    if (storedPreference === null) {
      return true; // Default to true if no preference is stored
    }
    // Parse the stored preference and return it, otherwise default to true
    return storedPreference === "true";
  });

  const [showSatScore, setShowSatScore] = useState(() => {
    // Retrieve the state from localStorage, default to true if not set
    const storedValue = localStorage.getItem("showSatScore");
    return storedValue === null ? true : storedValue === "true";
  });

  const [devModeEnabled, setDevModeEnabled] = useState(
    JSON.parse(localStorage.getItem("devModeEnabled")) || false
  );

  const [collapseTopHolders, setCollapseTopHolders] = useState(false);
  const [collapseTopHoldersFound, setCollapseTopHoldersFound] = useState(false);

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

  useEffect(() => {
    localStorage.setItem("showSatScore", showSatScore);
  }, [showSatScore]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleShowTopHoldersChange = (event) => {
    const value = event.target.checked;
    setShowTopHolders(value);
    localStorage.setItem("showTopHolders", JSON.stringify(value));
  };

  const handleShowTopHoldersFoundChange = (event) => {
    const value = event.target.checked;
    setShowTopHoldersFound(value);
    localStorage.setItem("showTopHoldersFound", JSON.stringify(value));
  };

  const handleShowFeelingLuckyChange = (event) => {
    const value = event.target.checked;
    setShowFeelingLucky(value);
    localStorage.setItem("showFeelingLucky", JSON.stringify(value));
  };

  const handleShowBlockNumberInputChange = (event) => {
    const value = event.target.checked;
    setShowBlockNumberInput(value);
    localStorage.setItem("showBlockNumberInput", JSON.stringify(value));
  };

  const handleShowSatScoreComponentsChange = (event) => {
    const value = event.target.checked;
    setShowSatScoreComponents(value);
    localStorage.setItem("showSatScoreComponents", JSON.stringify(value));
  };

  const handleDevModeEnabledChange = (event) => {
    const value = event.target.checked;
    setDevModeEnabled(value);
    localStorage.setItem("devModeEnabled", JSON.stringify(value));
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

  const recommendedSets = [

    ["uncommon", "2009"],
    ["uncommon", "jan2009"],
    ["uncommon", "alpha", "paliblock"],
    ["uncommon", "alpha", "epoch0"],
    ["uncommon", "alpha", "epoch1"],
    ["uncommon", "alpha", "epoch2"],
    ["uncommon", "alpha", "epoch3"],
    ["uncommon", "alpha", "epoch4"],

    ["black_uncommon", "2009"],
    ["black_uncommon", "jan2009"],
    ["black_uncommon", "omega", "paliblock"],

    ["pizza", "alpha"],
    ["pizza", "omega"],
    ["pizza", "uncommon"],
    ["pizza", "palindrome", "2009"],
    ["pizza", "palindrome", "sequence_palindrome"],
    ["pizza", "palindrome", "paliblock"],
    ["pizza", "palindrome", "uniform_palinception"],
    ["pizza", "palindrome", "uniform_palinception", "paliblock"],

    ["jpeg", "alpha"],
    ["jpeg", "omega"],
    ["jpeg", "uncommon"],
    ["jpeg", "palindrome"],
    ["jpeg", "palindrome", "uniform_palinception"],

    ["hitman", "alpha"],
    ["hitman", "omega"],
    ["hitman", "palindrome"],

    ["silkroad", "alpha"],
    ["silkroad", "omega"],
    ["silkroad", "palindrome"],

    ["nakamoto", "palindrome"],
    ["nakamoto", "alpha"],
    ["nakamoto", "omega"],

    ["vintage", "alpha"],
    ["vintage", "omega"],
    ["vintage", "palindrome"],
    ["vintage", "palindrome", "paliblock"],
    ["vintage", "palindrome", "3_digits"],
    ["vintage", "palindrome", "2_digits"],

    ["block_78", "alpha"],
    ["block_78", "omega"],
    ["block_78", "palindrome"],
    ["block_78", "palindrome", "2_digits"],
    ["block_78", "palindrome", "3_digits"],
    ["block_78", "uniform_palinception"],
    ["block_78", "perfect_palinception"],

    ["palindrome", "1_digit"],
    ["palindrome", "2_digits"],
    ["palindrome", "3_digits"],
    ["palindrome", "3_digits", "epoch1"],
    ["palindrome", "3_digits", "epoch2"],
    ["palindrome", "3_digits", "epoch3"],
    ["palindrome", "3_digits", "epoch4"],

    ["uniform_palinception"],
    ["uniform_palinception", "2_digits"],
    ["uniform_palinception", "3_digits"],
    ["uniform_palinception", "paliblock", "palindrome"],
    ["uniform_palinception", "paliblock", "3_digits"],
    ["uniform_palinception", "paliblock", "2_digits"],
    ["uniform_palinception", "sequence_palindrome"],
    ["uniform_palinception", "paliblock", "3_digits", "sequence_palindrome"],

    ["perfect_palinception"],
    ["perfect_palinception", "paliblock"],
    ["perfect_palinception", "2_digits"],
    ["perfect_palinception", "3_digits"],
    ["perfect_palinception", "paliblock", "3_digits"],
    ["perfect_palinception", "epoch1"],
    ["perfect_palinception", "epoch2"],
    ["perfect_palinception", "epoch3"],
    ["perfect_palinception", "epoch4"],
    ["perfect_palinception", "sequence_palindrome"],

    ["450x", "palindrome"],
    ["block_9", "palindrome"],
    ["block_9", "alpha"],

    ["block_286", "palindrome"],
    ["block_286", "alpha"],

    ["rodarmor"],
    ["rodarmor", "2009"],
    
    ["legacy"],
  ];

  const handleRecommendMeClick = () => {
    // Randomly pick a set from the recommended sets
    const randomSet = recommendedSets[Math.floor(Math.random() * recommendedSets.length)];
    // Check the new set
    setSelectedRarities(randomSet);

    // Set flag to trigger API request after state updates
    setRecommendTriggered(true);
  };

  const handleQueryClick = useCallback(() => {
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

    const query = selectedRarities.filter(
      (item) => !item.startsWith("epoch") && !item.startsWith("trailing")
    ).join(",");
    let apiUrl = `https://api.deezy.io/v1/sat-hunting/circulation?rarity=${query}`;
    if (block_start !== undefined && block_end !== undefined) {
      apiUrl += `&block_start=${block_start}&block_end=${block_end}`;
    }

    if(showTopHolders || showTopHoldersFound) {
      apiUrl += `&include_top_holders=true`;
    }

    if(isUncommonSelected && trailingZeroes ) {
      apiUrl += `&trailing_0s=` + trailingZeroes;
    }

    if (blockNumber) {
      apiUrl += `&block=` + blockNumber;
    }

    setLoading(true);

    setQueriedRarities([
      ...selectedRarities
        .filter((item) => !item.startsWith("trailing_0s"))  // Remove old trailing_0s values
        .filter((item) => !item.startsWith("blocknum_")),      // Remove block number
      ...(isUncommonSelected && trailingZeroes ? [`trailing_0s_${trailingZeroes}`] : []), // Add new trailing_0s if applicable
      ...(blockNumber ? [`blocknum_${blockNumber}`] : []), // Add new block number if applicable
    ]);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          const originalMessage = data.message;

          let message = originalMessage;
          if(message && message.includes("could not fetch result")) {
            message = "Your request was not found in the API cache and has been added to the queue. Please try again in a few seconds."
          }

          setError(message);
          setApiResults(null);
        } else {
          setApiResults(data.data);
          setError(null);

          // Save the query and results in localStorage
          const satScore = calculateSatScore(data.data.n_total, data.data.n_mined, data.data.n_365, data.data.n_seq, data.data.n_seq_holders);

          if(data.data.n_total > 0 && satScore.score) {
            const sortedRarities = [
              ...selectedRarities,
              ...(isUncommonSelected && trailingZeroes ? [`trailing_0s_${trailingZeroes}`] : []), // Add new trailing_0s if applicable
              ...(blockNumber ? [`blocknum_${blockNumber}`] : []), // Add new block number if applicable
            ].sort(); // Create a sorted copy

            const queryData = {
              query: sortedRarities, // Use the sorted rarities here
              result: data.data,
              satScore: satScore,
            };
          
            // Get existing queries from localStorage
            const savedQueries = JSON.parse(localStorage.getItem('queries')) || [];
          
            // Prevent duplicates by comparing the sorted queries
            const isDuplicate = savedQueries.some(
              item => item.query.join(",") === sortedRarities.join(",")
            );
          
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
        setApiQueryUrl(apiUrl);
      });
  }, [selectedRarities, showTopHolders, showTopHoldersFound, isUncommonSelected, trailingZeroes, blockNumber]);

  // Monitor state changes and make the API request
  useEffect(() => {
    if (recommendTriggered && selectedRarities.length > 0) {
      handleQueryClick();
      setRecommendTriggered(false); // Reset the flag
    }
  }, [selectedRarities, recommendTriggered, handleQueryClick]);

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

          {category === "Rodarmor Rarity" && isUncommonSelected && (
            <div className="trailing-zeroes-container">
              <label htmlFor="trailingZeroes" className="trailing-zeroes-input-label">Trailing Zeroes</label>
              <input
                className="trailing-zeroes-input"
                type="number"
                min="1"
                max="14"
                value={trailingZeroes}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || (value >= 1 && value <= 14)) {
                    setTrailingZeroes(value);
                  }
                }}
                placeholder="1-14"
                id="trailingZeroes"
              />
            </div>
          )}

          {category === "Other" && showBlockNumberInput && (
            <div className="block-input-container">
              <label htmlFor="blockNumber" className="block-input-label">Block Number</label>
              <input
                type="number"
                id="blockNumber"
                className="block-input-field"
                placeholder="Enter block number (0 - 1,000,000)"
                min="0"
                max="1000000"
                value={blockNumber}
                onChange={(e) => setBlockNumber(e.target.value)}
              />
            </div>
          )}

        </div>

      {/* Add small block for mobile */}
      {category === "Halving epochs" && (
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
    <div className={`container mt-3 mt-md-4 ${darkMode ? 'dark-mode-container' : ''}`}>
      {/* Header with "Select Rarities" and Settings Icon */}
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        style={{ position: "relative" }}
      >
        {/* Night Mode Toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            className={darkMode ? "text-light" : "text-dark"}
            style={{ fontWeight: "bold" }}
          >
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

        {/* Settings Icon */}
        <div
          className="settings-icon"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
        <FaCog
          size={24}
          onClick={handleToggleSettings}
          style={{
            cursor: "pointer",
            color: darkMode ? "#ffffff" : "#333333", // Adjust color for light mode
            marginLeft: "10px",
          }}
        />

          {/* Settings Dropdown */}
          {showSettings && (
            <div
              className="settings-menu"
              style={{
                position: "absolute",
                top: "30px",
                right: "0",
                background: "#333",
                color: "#fff",
                border: "1px solid #555",
                borderRadius: "5px",
                padding: "10px",
                zIndex: 10,
                minWidth: "200px",
              }}
            >
              <label className="d-flex align-items-center mb-1">
                <input
                  type="checkbox"
                  checked={showTopHolders}
                  onChange={handleShowTopHoldersChange}
                  className="me-2"
                />
                Show Top Holders
              </label>
              <label className="d-flex align-items-center mb-1">
                <input
                  type="checkbox"
                  checked={showTopHoldersFound}
                  onChange={handleShowTopHoldersFoundChange}
                  className="me-2"
                />
                Show Top Holders (Found)
              </label>
              <label className="d-flex align-items-center mb-1">
                <input
                  type="checkbox"
                  checked={showSatScoreComponents}
                  onChange={handleShowSatScoreComponentsChange}
                  className="me-2"
                />
                Show Sat Score Components
              </label>
              <label className="d-flex align-items-center mb-1">
                <input
                  type="checkbox"
                  checked={showBlockNumberInput}
                  onChange={handleShowBlockNumberInputChange}
                  className="me-2"
                />
                Show Block Number Input
              </label>
              <label className="d-flex align-items-center mb-1">
                <input
                  type="checkbox"
                  checked={showFeelingLucky}
                  onChange={handleShowFeelingLuckyChange}
                  className="me-2"
                />
                Show Feeling Lucky
              </label>
              <label className="d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={devModeEnabled}
                  onChange={handleDevModeEnabledChange}
                  className="me-2"
                />
                Enable Dev Mode
              </label>
            </div>
          )}
        </div>
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

      <div className="text-center my-4">
        <button
          className="query-button"
          onClick={handleQueryClick}
        >
          Query
        </button>
        {showFeelingLucky && (
          <button
            className="feelin-lucky-button ms-2"
            onClick={handleRecommendMeClick}
          >
            Feelin' Lucky
          </button>
        )}
        <button
          className="clear-button ms-2"
          onClick={handleClearClick}
        >
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

      {devModeEnabled && apiQueryUrl && (
        <div className="alert alert-warning">
          <strong>Last Query Url:</strong> {apiQueryUrl}
        </div>
      )}

      {apiResults && !loading && (
        <div className="mt-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap", // Allows wrapping for smaller screens
              gap: "10px",
            }}
          >
            <h2
              className={`mb-0 ${darkMode ? "text-light" : "text-dark"}`}
              style={{ flex: "1 0 auto" }} // Flex item with responsive width
            >
              Results
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                flex: "0 0 auto", // Prevents shrinking for the input and label
              }}
            >
              <label
                className={darkMode ? "text-light" : "text-dark"}
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  whiteSpace: "nowrap", // Prevents text wrapping
                }}
              >
                Floor Price, $
              </label>
              <input
                type="number"
                value={floorPrice}
                onChange={(e) => setFloorPrice(e.target.value)}
                placeholder="Enter value"
                style={{
                  width: "120px", // Adjusted for better readability
                  padding: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "1rem",
                }}
              />
            </div>
          </div>

          {/* Selected Traits Section */}
          <div className="mb-3">
            <p className={darkMode ? "text-light" : "text-dark"} style={{ fontSize: "1rem" }}>
              {queriedRarities.length > 0 ? queriedRarities.join(", ") : "None"}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {[
              { label: "Total", value: apiResults.n_total },
              { label: "Mined", value: apiResults.n_mined, percentage_mined: true },
              { label: "Active Epoch", value: apiResults.n_epoch, percentage: true },
              { label: "Active 365 Days", value: apiResults.n_365, percentage: true },
              { label: "Found", value: apiResults.n_seq, percentage: true },
              { label: "Inscribed", value: apiResults.n_inscribed, percentage: true },
              { label: "Holders (Found)", value: apiResults.n_seq_holders, noMC: true },
              { label: "Holders (Total)", value: apiResults.n_total_holders, noMC: true },
              { label: "Updated At", value: new Date(apiResults.updated_at).toLocaleDateString("en-US"), noMC: true },
            ].map((item, index) => {
              const value = item.label === "Updated At" ? item.value : parseInt(item.value, 10); // Handle non-numeric values
              const marketCap = floorPrice && !item.noMC && value > 0 ? value * floorPrice : null; // Skip MC for specified cards
              const percentage = item.percentage && apiResults.n_mined > 0 ? ((item.value/apiResults.n_mined)*100).toFixed(1) : null; // Percentage
              const percentage_mined = item.percentage_mined && apiResults.n_total > 0 ? ((item.value/apiResults.n_total)*100).toFixed(1) : null; // Percentage Mined
              return (
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
                  <p style={{ fontSize: "1.2rem", margin: 0 }}>
                    {item.label === "Updated At" ? value : formatNumber(value)}
                    {(percentage || percentage_mined) && (
                      <span
                        className="percentage-text"
                        style={{
                          fontSize: "0.85rem", // Make it slightly smaller
                          color: "gray",       // Deemphasize with a muted color
                          marginLeft: "4px",   // Add spacing
                        }}
                      >
                        ({formatNumber(percentage ? percentage : percentage_mined)}%)
                      </span>
                    )}
                    {marketCap && marketCap > 0 && (
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.9rem",
                          color: darkMode ? "#BBBBBB" : "#666666",
                        }}
                      >
                        (Market Cap ${formatNumber(marketCap)})
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Display Sat Score if available */}
      {apiResults && !loading && (
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

            {/* Sat Score Section with Toggle */}
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
          </div>
        </>
      )}

      {showTopHoldersFound && apiResults?.top_seq_holders?.length > 0 && (
        <div className="my-4">
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "10px" }}>
            <h3 className={darkMode ? "text-light" : "text-dark"} style={{ margin: 0 }}>
              Top Holders (Found)
            </h3>
            <label
              className="switch-container"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <span className={darkMode ? "text-light" : "text-dark"} style={{ fontSize: "1rem" }}>
                {collapseTopHoldersFound ? "Show" : "Hide"}
              </span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!collapseTopHoldersFound}
                  onChange={() => setCollapseTopHoldersFound((prev) => !prev)}
                />
                <span className="slider"></span>
              </label>
            </label>
          </div>
          
          {!collapseTopHoldersFound && (
            <div
              style={{
                overflowX: "auto", // Enable horizontal scrolling if needed
                width: "100%",     // Ensure the container fits within the screen width
              }}
              className="mt-3"
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
                  <th>#</th>
                  <th>Address</th>
                  <th>Quantity</th>
                  <th>Cumulative % (Fnd)</th>
                  <th>Cumulative %</th>
                  <th>Max Sent Height</th>
                  <th>Max Received Height</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  let cumulativeSum = 0; // Initialize cumulative sum
                  let cumulativeSumTotal = 0; // Initialize cumulative sum total
                  const nSeq = apiResults.n_seq; // Total `n_seq` value
                  const nTotal = apiResults.n_total; // Total `n_total` value
                  return apiResults.top_seq_holders.map((holder, index) => {
                    cumulativeSum += holder.n; // Add the current holder's quantity to the cumulative sum
                    const cumulativePercentage = ((cumulativeSum / nSeq) * 100).toFixed(2); // Calculate cumulative percentage
                    cumulativeSumTotal += holder.n;
                    const cumulativePercentageTotal = ((cumulativeSumTotal / nTotal) * 100).toFixed(2);
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{holder.address}</td>
                        <td>{holder.n}</td>
                        <td>{cumulativePercentage}%</td> {/* Display cumulative percentage */}
                        <td>{cumulativePercentageTotal}%</td> {/* Display cumulative percentage Total*/}
                        <td>{holder.max_send_height}</td>
                        <td>{holder.max_receive_height}</td>
                      </tr>
                    );
                  });
                })()}
              </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showTopHolders && apiResults?.top_holders?.length > 0 && (
        <div className="my-4">
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "10px" }}>
            <h3 className={darkMode ? "text-light" : "text-dark"} style={{ margin: 0 }}>
              Top Holders
            </h3>
            <label
              className="switch-container"
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <span className={darkMode ? "text-light" : "text-dark"} style={{ fontSize: "1rem" }}>
                {collapseTopHolders ? "Show" : "Hide"}
              </span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!collapseTopHolders}
                  onChange={() => setCollapseTopHolders((prev) => !prev)}
                />
                <span className="slider"></span>
              </label>
            </label>
          </div>

          <div
            style={{
              overflowX: "auto", // Enable horizontal scrolling if needed
              width: "100%",     // Ensure the container fits within the screen width
            }}
            className="mt-3"
          >
            {!collapseTopHolders && (
            <table
              className={`table ${darkMode ? "table-dark" : "table-light"} table-striped`}
              style={{
                border: darkMode ? "1px solid #444" : "1px solid #ddd",
                minWidth: "800px", // Ensure the table is readable on smaller screens
              }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Address</th>
                  <th>Quantity</th>
                  <th>Cumulative %</th>
                  <th>Max Sent Height</th>
                  <th>Max Received Height</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  let cumulativeSum = 0; // Initialize cumulative sum
                  const nTotal = apiResults.n_total; // Total `n_total` value
                  return apiResults.top_holders.map((holder, index) => {
                    cumulativeSum += holder.n; // Add the current holder's quantity to the cumulative sum
                    const cumulativePercentage = ((cumulativeSum / nTotal) * 100).toFixed(2); // Calculate cumulative percentage
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{holder.address}</td>
                        <td>{holder.n}</td>
                        <td>{cumulativePercentage}%</td> {/* Display cumulative percentage */}
                        <td>{holder.max_send_height}</td>
                        <td>{holder.max_receive_height}</td>
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
            )}
          </div>
        </div>
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
              <th>Actv<sub>E</sub></th>
              <th>Actv<sub>365</sub></th>
              <th>Found</th>
              <th>H<sub>fnd</sub></th>
              <th>H<sub>ttl</sub></th>
              <th>%Actv<sub>E</sub></th>
              <th>%Actv<sub>365</sub></th>
              <th>%Fnd</th>
              {showSatScoreComponents && (
                <>
                <th>S<sub>ci</sub></th>
                <th>AF<sub>ci</sub></th>
                <th>H<sub>ci</sub></th>
                </>
              )}
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedQueries.map((queryData, index) => (
              <tr key={index}>
                <td>{queryData.query.join(", ")}</td>
                <td>{formatNumber(queryData.result.n_total)}</td>
                <td>{formatNumber(queryData.result.n_mined)}</td>
                <td>{formatNumber(queryData.result.n_epoch)}</td>
                <td>{formatNumber(queryData.result.n_365)}</td>
                <td>{formatNumber(queryData.result.n_seq)}</td>
                <td>{formatNumber(queryData.result.n_seq_holders)}</td>
                <td>{formatNumber(queryData.result.n_total_holders)}</td>
                <td>{((queryData.result.n_epoch / queryData.result.n_mined) * 100).toFixed(1)}%</td>
                <td>{((queryData.result.n_365 / queryData.result.n_mined) * 100).toFixed(1)}%</td>
                <td>{((queryData.result.n_seq / queryData.result.n_mined) * 100).toFixed(1)}%</td>
                {showSatScoreComponents && (
                  <>
                  <td>{queryData.satScore.Sci.toFixed(2)}</td>
                  <td>{queryData.satScore.AFci.toFixed(2)}</td>
                  <td>{queryData.satScore.Hci.toFixed(2)}</td>
                  </>
                )}
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
            className="clear-query-history-button"
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
