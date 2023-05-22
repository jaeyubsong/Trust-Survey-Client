import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/main/Navbar';
import Table from './components/survey_list/Table';
import SurveyListSide from './components/survey_list/SurveyListSide';
import './SurveyList.css';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    axios
      .get('http://143.248.134.9:8080/survey')
      .then(res => {
        setSurveys(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="survey-list-container">
        <div className="SurveyListSide">
          <SurveyListSide surveys={surveys} flag={true}/>
        </div>
        <div className="Table">
          <Table surveys={surveys} />
        </div>
      </div>
    </div>
  );
};

export default SurveyList;
