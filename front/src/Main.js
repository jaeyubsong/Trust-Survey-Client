import React from 'react';
import './App.css';
import Navbar from './components/main/Navbar';
import Intro from './components/main/Intro';
import CardContainer from './components/main/CardContainer';

 
function Main() {
  return (
    <div className="App">
      <Navbar />
      <Intro /> 
      <CardContainer/>
    </div>
  );
}

export default Main;
