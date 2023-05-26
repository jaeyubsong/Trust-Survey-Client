import React from "react";
import "./Card.css";

const Card = ({ title, description, compensation, endDate, currentMember }) => {
  const [responses, maxAttendeeCount] = currentMember.split(" / ");

  const responsesStyle = {
    fontSize: "1.2em", // Increase font size for responses
  };

  const maxAttendeeCountStyle = {
    fontSize: "0.7em", // Decrease font size for maxAttendeeCount
  };

  return (
    <div className="card">
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <p>Reward: <b>{compensation} KLAY </b></p>
        <p>End date: {endDate}</p>
      </div>
      <div className="current-member-container">
        <div className="current-member">
          <span style={responsesStyle}>{responses}</span>{" "}
          <span style={maxAttendeeCountStyle}>/ {maxAttendeeCount}</span>
        </div>
        <button className="learn-more-button">Participate</button>
      </div>
    </div>
  );
};

export default Card;
