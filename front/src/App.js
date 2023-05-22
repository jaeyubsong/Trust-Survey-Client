import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import CreateSurvey from './CreateSurvey';
import SurveyList from './SurveyList';
import Survey from './Survey';

function App() {
  return (
    <Routes> 
      <Route exact path="/" element={<Main />} />
      <Route exact path="/create_survey" element={<CreateSurvey />} />
      <Route exact path="/survey_list" element={<SurveyList />} />
      <Route exact path="/survey" element={<Survey />} />

    </Routes>
  );
}

export default App;
