import React, { useState, useEffect, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './App.css'; // Add a CSS file for additional styling
import { FaCog, FaRegQuestionCircle } from "react-icons/fa"; // Install react-icons if not already installed
import { recommendedSets } from "./recommendedSets"
import { calculateSatScore } from "./SatScore"
import SettingsDropdown from "./SettingsDropdown"
import Footer from "./Footer"
import SatScoreDescription from "./SatScoreDescription";

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
    document.title = "Rare Sats: Supply and Circulation";
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
  const [selectedYear, setSelectedYear] = useState(null);

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

  const [showTooltips, setShowTooltips] = useState(() => {
    // Retrieve the state from localStorage, default to true if not set
    const storedValue = localStorage.getItem("showTooltips");
    return storedValue === null ? true : storedValue === "true";
  });

  const [showYearMined, setShowYearMined] = useState(() => {
    // Retrieve the state from localStorage, default to true if not set
    const storedValue = localStorage.getItem("showYearMined");
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

  const handleShowTooltipsChange = (event) => {
    const value = event.target.checked;
    setShowTooltips(value);
    localStorage.setItem("showTooltips", JSON.stringify(value));
  };

  const handleShowYearMinedChange = (event) => {
    const value = event.target.checked;
    setShowYearMined(value);
    localStorage.setItem("showYearMined", JSON.stringify(value));
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
    setSelectedYear(null);
    setBlockNumber('');
    setApiResults(null);
    setError(null);
  };

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

    if (selectedYear) {
      apiUrl += `&year_mined=${selectedYear}`;
    }

    setLoading(true);

    setQueriedRarities([
      ...selectedRarities
        .filter((item) => !item.startsWith("trailing_0s"))  // Remove old trailing_0s values
        .filter((item) => !item.startsWith("blocknum_")),      // Remove block number
      ...(isUncommonSelected && trailingZeroes ? [`trailing_0s_${trailingZeroes}`] : []), // Add new trailing_0s if applicable
      ...(blockNumber ? [`blocknum_${blockNumber}`] : []), // Add new block number if applicable
      ...(selectedYear ? [`mined_${selectedYear}`] : []), // Add mined year if applicable
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
              ...(selectedYear ? [`mined_${selectedYear}`] : []), // Add mined year if applicable
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
  }, [selectedRarities, showTopHolders, showTopHoldersFound, isUncommonSelected, trailingZeroes, blockNumber, selectedYear]);

  // Monitor state changes and make the API request
  useEffect(() => {
    if (recommendTriggered && selectedRarities.length > 0) {
      handleQueryClick();
      setRecommendTriggered(false); // Reset the flag
    }
  }, [selectedRarities, recommendTriggered, handleQueryClick]);

  const renderCategory = (category, items, borderColor) => {

    const tooltips = {
      epoch0: "Jan 3, 2009 – Nov 28, 2012",  // Genesis block to first halving
      epoch1: "Nov 28, 2012 – Jul 9, 2016",  // First to second halving
      epoch2: "Jul 9, 2016 – May 11, 2020",  // Second to third halving
      epoch3: "May 11, 2020 – Apr 20, 2024", // Third to fourth halving
      epoch4: "Apr 20, 2024 – Mar ??, 2028", // Fourth to fifth halving
      pizza: "Pizza Sats were used in the iconic transaction of 10,000 BTC for two pizzas on May 22, 2010. This event marks the first recorded use of Bitcoin to purchase physical goods.",
      jpeg: "Jpeg Sats originate from what may be the first Bitcoin transaction involving an image, dated February 24, 2010.",
      hitman: "Hitman sats are tied to a controversial transaction allegedly made by Ross Ulbricht, the founder of the Silk Road marketplace, in an attempt to hire a hitman.",
      silkroad: "Silk Road sats were seized from the infamous marketplace and are part of the first Bitcoin auctioned off by the US Marshals on June 27, 2014.",
      rodarmor: "Rodarmor Names are sat names featured in the Ordinal Bounty 3, a challenge rewarding hunters for discovering sat names based on the Google Books Ngram dataset",
      legacy: "Legacy Sats are sats distributed in paper wallets during Casey Rodarmor's June 2022 Bitcoin workshop, months before the first Inscription.",
      '450x': "The first Bitcoin from block 9",
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
            <div key={item} style={{ marginRight: "10px", marginBottom: "5px", display: "flex", alignItems: "center" }}>
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
                >
                  {item}
              </label>
              {showTooltips && tooltips[item] && 
                <div className="info-icon-container d-none d-md-block">
                  <FaRegQuestionCircle className="info-icon" /> {/* Use FaInfoCircle or FaCog */}
                  <div className="tooltip">{tooltips[item]}</div>
                </div>
              }
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
      {showTooltips && category === "Halving epochs" && (
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
          {Object.entries(tooltips).filter(([key]) => key.startsWith("epoch")).map(([epoch, range]) => (
            <p key={epoch} style={{ margin: 0 }}>
              <strong>{epoch}:</strong> {range}
            </p>
          ))}
        </div>
      )}
      </div>

    );
  };

  const convertToCSV = (data) => {
    // Extract headers, excluding holders data and including only power_transformed_score
    const headers = [
      'query', 
      'n_total', 
      'n_mined', 
      'n_epoch', 
      'n_365', 
      'n_seq', 
      'n_inscribed', 
      'n_seq_holders', 
      'n_total_holders', 
      'updated_at', 
      'satScore'
    ].join(';');

    // Map through the data to create the CSV rows
    const rows = data.map(item => {
      // Join the values in the object
      const row = [
        item.query.join(','),  // Join multiple query items with a comma
        item.result.n_total,
        item.result.n_mined,
        item.result.n_epoch,
        item.result.n_365,
        item.result.n_seq,
        item.result.n_inscribed,
        item.result.n_seq_holders,
        item.result.n_total_holders,
        item.result.updated_at,
        item.satScore.power_transformed_score.toFixed(2)
      ].join(';'); // Join values with a semicolon
      
      return row;
    }).join('\n'); // Join all rows with a newline

    // Combine headers and rows into a single CSV string
    return `${headers}\n${rows}`;
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(sortedQueries);
    
    // Create a Blob from the CSV string
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    
    // Create an invisible link to trigger the download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');  // Set the default filename
    link.style.visibility = 'hidden';
    
    // Append the link to the body, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const DownloadButton = () => {
    return (
      <div className="text-center mt-3">
        <button
          className="download-csv-button"
          onClick={downloadCSV}
        >
          Download CSV
        </button>
      </div>
    );
  };

  // Get saved queries from localStorage
  const savedQueries = JSON.parse(localStorage.getItem('queries')) || [];

  // Sort the saved queries by Sat score
  const sortedQueries = savedQueries.sort((a, b) => b.satScore.score - a.satScore.score);

  return (
    <div className={`container mt-3 mt-md-4 ${darkMode ? 'dark-mode-container' : ''}`}>
      {/* Header with "Select Categories" and Settings Icon */}
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

          <SettingsDropdown 
            showSettings={showSettings}
            settings={{
              showTopHolders,
              showTopHoldersFound,
              showSatScoreComponents,
              showBlockNumberInput,
              showFeelingLucky,
              showTooltips,
              showYearMined,
              devModeEnabled
            }}
            handlers={{
              showTopHolders: handleShowTopHoldersChange,
              showTopHoldersFound: handleShowTopHoldersFoundChange,
              showSatScoreComponents: handleShowSatScoreComponentsChange,
              showBlockNumberInput: handleShowBlockNumberInputChange,
              showFeelingLucky: handleShowFeelingLuckyChange,
              showTooltips: handleShowTooltipsChange,
              showYearMined: handleShowYearMinedChange,
              devModeEnabled: handleDevModeEnabledChange
            }}
          />
        </div>
      </div>

      <h1 className={`text-center mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>Select Categories</h1>
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

        {showYearMined &&
          <div
            style={{
              border: darkMode ?  `2px solid #fff` :  `2px solid #aaa`,
              borderRadius: "10px",
              margin: "5px",
              padding: "10px",
              flex: "1 1 30%", // Adjust for a compact layout
              minWidth: "200px",
            }}
          >
            <h5
              style={{
                color: darkMode ? '#fff' : "#777",
                marginBottom: "5px",
              }}
            >
              Year mined
            </h5>
            <div className="d-flex flex-wrap">
                {[...Array(17)].map((_, index) => {
                  const year = 2009 + index;
                  return (
                    <div key={year} style={{ marginRight: "10px", display: "flex", alignItems: "center" }}>
                      <input
                        type="checkbox"
                        id={`year-${year}`}
                        name="year"
                        value={year}
                        checked={selectedYear === year.toString()}
                        onChange={(e) => {
                          const value = e.target.checked ? e.target.value : null;
                          setSelectedYear(value);
                        }}
                      />
                      <label htmlFor={`year-${year}`} style={{ marginLeft: "5px" }}>
                        {year}
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>
        }

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

            <SatScoreDescription darkMode={darkMode} setShowSatScore={setShowSatScore} showSatScore={showSatScore} />
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

      {devModeEnabled && sortedQueries.length > 0 &&
        <DownloadButton />
      }

      <Footer />

    </div>
  );
};

export default App;
