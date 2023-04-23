import React from "react";

const ReloadButton = () => {
  const handleReload = () => {
    window.location.reload(); // Reload the page
  };

  return (
    <div className="reload">
      <button onClick={handleReload} className="reload-button">
        New Lineup
      </button>
    </div>
  );
};

export default ReloadButton;
