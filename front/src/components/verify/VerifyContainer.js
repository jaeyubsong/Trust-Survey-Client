import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './VerifyContainer.css';


const VerifyContainer = () => {
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [input, setInput] = useState('');

  const handleRetrieve = () => {
    // Logic to retrieve data based on input
  };

  return (
    <div className="verifyContainer">
        <div className="subVerifyContainer">

        <div className="searchBox">
            <h1><FaCheckCircle className="verifyIcon" />Verify Survey Data Here!</h1>
            <h3>Put the <b>survey id</b> of the response that you want to verify!</h3>
            <label>Survey ID</label>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleRetrieve}>Retrieve</button>
            <hr className="divider" />
        </div>

        <div className="resultBox">
            <h3>Results</h3>
            <div className="hashContainer">
                <div className="hashBox">
                <label>Question Hashes</label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                </div>
                <div className="hashBox">
                <label>Answer Hashes</label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                </div>
            </div>
        </div>

        </div>
    </div>
  );
};

export default VerifyContainer;


//   useEffect(() => { 
//     axios
//       .get(`http://3.27.95.249:8080/survey/${new URLSearchParams(window.location.search).get("id")}`)
//       .then(res => {
//         setSurvey(res.data);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }, []);
