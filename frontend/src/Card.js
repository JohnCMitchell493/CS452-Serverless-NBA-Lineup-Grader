import React from "react";

const Card = ({ imageUrl, title, height, points, rebounds, assists }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title} </h2>
        <p className="card-title card-description">{height}</p>
        <p className="card-description">PPG: {points}</p>
        <p className="card-description">RPG: {rebounds}</p>
        <p className="card-description">APG: {assists}</p>
      </div>
    </div>
  );
};

export default Card;
