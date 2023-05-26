import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../main/Navbar';
import Table from '../survey_list/Table';
import SurveyListSide from '../survey_list/SurveyListSide';
import SurveyForm from './SurveyForm';
import '../../SurveyList.css';

const Admin = () => {
  const [survey, setSurvey] = useState({});

  useEffect(() => { 
    axios
      .get(`http://3.27.95.249:8080/survey/${new URLSearchParams(window.location.search).get("id")}`)
      .then(res => {
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

export default Admin;
