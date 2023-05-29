import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import CreateSurvey from './CreateSurvey';
import SurveyList from './SurveyList';
import Survey from './Survey';
import Admin from './components/survey/Admin.js'
import Verify from './Verify';

function App() {
  return (
    <Routes> 
      <Route exact path="/" element={<Main />} />
      <Route exact path="/create_survey" element={<CreateSurvey />} />
      <Route exact path="/survey_list" element={<SurveyList />} />
      <Route exact path="/survey" element={<Survey />} />
      <Route exact path="/admin" element={<Admin />} />
      <Route exact path="/verify" element={<Verify />} />

    </Routes>
  );
}

export default App;
