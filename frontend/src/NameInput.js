import React, { useState } from "react";

const NameForm = ({ onSubmit }) => {
  const [point_gaurd, setPG] = useState("");
  const [shooting_guard, setSG] = useState("");
  const [small_forward, setSF] = useState("");
  const [power_forward, setPF] = useState("");
  const [center, setC] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    if (
      !point_gaurd ||
      !shooting_guard ||
      !small_forward ||
      !power_forward ||
      !center
    ) {
      setFormError("Please complete all fields.");
      return;
    }

    // Reset form error
    setFormError("");
    onSubmit([
      point_gaurd,
      shooting_guard,
      small_forward,
      power_forward,
      center,
    ]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Point Guard"
          value={point_gaurd}
          onChange={(e) => setPG(e.target.value)}
        />
      </div>

      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Shooting Guard"
          value={shooting_guard}
          onChange={(e) => setSG(e.target.value)}
        />
      </div>

      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Small Forward"
          value={small_forward}
          onChange={(e) => setSF(e.target.value)}
        />
      </div>

      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Power Forward"
          value={power_forward}
          onChange={(e) => setPF(e.target.value)}
        />
      </div>

      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Center"
          value={center}
          onChange={(e) => setC(e.target.value)}
        />
      </div>

      {formError && <p className="error-message">{formError}</p>}

      <button type="submit" className="submit-button">
        Grade
      </button>
    </form>
  );
};

export default NameForm;
