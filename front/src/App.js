import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import CreateSurvey from './CreateSurvey';

function App() {
  return (
    <Routes> 
      <Route exact path="/" element={<Main />} />
      <Route exact path="/create_survey" element={<CreateSurvey />} />
    </Routes>
  );
}

export default App;
