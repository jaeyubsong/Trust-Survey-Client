import React, { useState, useEffect } from 'react';
import Card from "./Card";
import axios from 'axios';
import "./Card.css";

const CardContainer = () => {
  const [surveys, setSurveys] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    axios
      .get('http://3.27.95.249:8080/survey')
      .then(res => {
        setSurveys(res.data);
        debugger;
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (endDate) => {
    const now = currentTime;
    const end = new Date(endDate);
    const timeDiff = end - now;

    if (timeDiff <= 0) {
      return "Expired";
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `D-${days} ${hours}:${minutes}:${seconds}`;
  };

  const filteredSurveys = surveys.filter(survey => {
    const endDate = new Date(survey.automaticClosingDatetime);
    const hasSpaceAvailable = survey.responses.length < survey.maxAttendeeCount;
    const isExpired = endDate - currentTime <= 0;
  
    return !isExpired && hasSpaceAvailable;
  });
  
  const sortedSurveys = filteredSurveys.sort((a, b) => {
    const dateA = new Date(a.automaticClosingDatetime);
    const dateB = new Date(b.automaticClosingDatetime);
  
    return dateB - dateA;
  });
  
  const recentSurveys = sortedSurveys.slice(0, 4);
  

  return (
    <div>
      <section className="title-section">
        <h1 className="title">Surveys for You</h1>
        <p className="subtitle">Take a look at our latest surveys</p>
      </section>
      <div className="section-divider"></div>
      <div className="card-container">
        {recentSurveys.map((survey, index) => (
          <Card
            key={index}
            title={survey.title}
            description={survey.desc}
            compensation={survey.reward}
            endDate={formatCountdown(survey.automaticClosingDatetime)}
            currentMember={`${survey.responses.length} / ${survey.maxAttendeeCount}`}
            id={survey.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
