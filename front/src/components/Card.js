import React from "react";
import "./Card.css";

const Card = ({ title, description, compensation, startDate, currentMember }) => {
  return (
    <div className="card">
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <p>Compensation: {compensation}</p>
        <p>Start date: {startDate}</p>
      </div>
      <div className="current-member-container">
        <div className="current-member">{currentMember}</div>
        <button className="learn-more-button">Learn More</button>
      </div>
    </div>
  );
};

export default Card;
