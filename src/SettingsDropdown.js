import React from "react";

const SettingsDropdown = ({
  showSettings,
  settings,
  handlers
}) => {
  if (!showSettings) return null;

  return (
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
      {Object.keys(settings).map((key) => (
        <label key={key} className="d-flex align-items-center mb-1">
          <input
            type="checkbox"
            checked={settings[key]}
            onChange={handlers[key]}
            className="me-2"
          />
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </label>
      ))}
    </div>
  );
};

export default SettingsDropdown;
