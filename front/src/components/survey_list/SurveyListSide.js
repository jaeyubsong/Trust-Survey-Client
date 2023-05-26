import React from 'react';
import './SurveyListSide.css';

const SurveyListSide = ({ surveys, flag }) => {
  const numSurveys = surveys? surveys.length : 0;

  // Here you could calculate the number of surveys added today using a date library like moment.js

  return (
    <div className="survey-side-container">
      <div className="survey-list-side">
        {flag ? (
          <div>
            <h2 className="survey-list-side-title">Survey Counter</h2>
            <p className="survey-list-side-text">There are <b>{numSurveys}</b> surveys collected in total.</p>
          </div>
        ) : (
          <div>
            <h2 className="survey-list-side-title">Survey Summary</h2>
            <p className="survey-list-side-text" style={{fontSize: '14px'}}>{surveys ? surveys.summary: "" }</p>
          </div>
        )}
      </div>

      <div className="container-box">
        <div className="search-text">Search Survey</div>
        <div className="search-container">
            <div className="search-bar">
                <input type="text" className="search-input" placeholder="Search surveys" />
            </div>
            <button className="search-button">Search</button>
        </div>


        {/* <div className="sort-container">
          <label htmlFor="sort-select">Sort by:</label>
          <select id="sort-select">
            <option value="closing-date">Closing date</option>
            <option value="reward">Reward</option>
          </select>
        </div> */}
      </div>
    </div>
  );
};

export default SurveyListSide;
