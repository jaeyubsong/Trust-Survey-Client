import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './components/main/Navbar';
import Table from './components/survey_list/Table';
import SurveyListSide from './components/survey_list/SurveyListSide';
import SurveyForm from './components/survey/SurveyForm';
import './SurveyList.css';

const Survey = () => {
  const [survey, setSurvey] = useState({});

  useEffect(() => { 
    debugger;
    axios
      .get(`http://127.0.0.1:8080/survey/${new URLSearchParams(window.location.search).get("id")}`)
      .then(res => {
        debugger;
        setSurvey(res.data);
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
          <SurveyListSide surveys={survey} flag={false}/>
        </div>
        <div className="Table">
          <SurveyForm survey={survey} />
        </div>
      </div>
    </div>
  );
};

export default Survey;
