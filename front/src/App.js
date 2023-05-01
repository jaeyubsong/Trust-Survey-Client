import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import CardContainer from './components/CardContainer';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Intro />
      <CardContainer/>
    </div>
  );
}

export default App;
