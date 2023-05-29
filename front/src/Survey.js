import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './components/main/Navbar';
import Table from './components/survey_list/Table';
import SurveyListSide from './components/survey_list/SurveyListSide';
import SurveyForm from './components/survey/SurveyForm';
import './SurveyList.css';
import stringify from 'json-stable-stringify';
import web3 from 'web3';


const Survey = () => {
  const [survey, setSurvey] = useState({});

  useEffect(() => { 
    axios
      .get(`http://3.27.95.249:8080/survey/${new URLSearchParams(window.location.search).get("id")}`)
      .then(res => {
        setSurvey(res.data);
        // console.log(res.data.responses[0]); 
        // console.log(stringify(res.data.responses[0]));
        // console.log(web3.utils.sha3(stringify(res.data.responses[0])));
      }) 
      .catch(err => {
        // console.log(err);
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
