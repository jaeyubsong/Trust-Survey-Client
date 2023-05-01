import React from "react";
import Card from "./Card";
import "./Card.css";

const CardContainer = () => {
  const cardsData = [
    {
      title: "Survey 1",
      description: "Description 1",
      compensation: "$1000",
      startDate: "10/01/2023",
      currentMember: "12 / 20",
    },
    {
      title: "Survey 2",
      description: "Description 2",
      compensation: "$2000",
      startDate: "01/01/2023",
      currentMember: "5 / 10",
    },
    {
      title: "Survey 3",
      description: "Description 1",
      compensation: "$1000",
      startDate: "10/01/2023",
      currentMember: "12 / 20",
    },
    {
      title: "Survey 4",
      description: "Description 2",
      compensation: "$2000",
      startDate: "01/01/2023",
      currentMember: "5 / 10",
    },
  ];

  return (
    <div>
      <section className="title-section">
        <h1 className="title">Surveys for You</h1>
        <p className="subtitle">Take a look at our latest surveys</p>
      </section>
      <div className="section-divider"></div>
      <div className="card-container">
        {cardsData.map((cardData, index) => (
          <Card key={index} {...cardData} />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
