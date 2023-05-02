import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Intro.css';

function Intro() {
  const navigate = useNavigate();

  return (
    <header className="App-header">
      <div className="slogan-container">
        <h2 className="slogan-header">Trust in your voice, trust in our technology</h2>
        <p className="slogan-text">
          Trust Survey is a revolutionary new survey design that puts the power of rewards and data security in the hands of the people. Our unique design utilizes blockchain technology to ensure that all survey participants are compensated through a secure smart contract system, eliminating the need for middlemen and guaranteeing fair compensation. Additionally, we provide unparalleled data security, ensuring that your responses remain private and free from manipulation or tampering. <br /> With <b>Trust Survey</b>, you can have confidence in your voice and trust in our technology.
        </p>
        <div className="button-container">
          <button className="create-survey-btn" onClick={() => navigate('/create_survey')}>
            Create Survey
          </button>
          <button className="survey-list-btn" onClick={() => navigate('/survey_list')}>Go to Survey List</button>
        </div>
      </div>
    </header>
  );
}

export default Intro;
