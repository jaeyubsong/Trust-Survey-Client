import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './VerifyContainer.css';
import Modal from 'react-modal';
import web3 from 'web3';
import stringify from 'json-stable-stringify';


const VerifyContainer = () => {
  const [qHash, setQHash] = useState('');
  const [aHash, setAHash] = useState([]);
  const [tHash, setTHash] = useState('');

  const [qText, setQText] = useState('');
  const [aText, setAText] = useState('');

  const [surveyID, setSurveyID] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);

  const DictExample = JSON.stringify({
    answers: [
      "A1",
      "A2",
      "A3"
    ],
    participantWalletId: "PARTICIPANT_ID",
    surveyId: "SURVEY_ID"
  });


  const handleVerQ = (e) => {
    e.preventDefault();
    const qHash_sha = web3.utils.sha3(qText);
    if (aHash.length !== 0) {
        if (qHash_sha === qHash) {
            alert("Success: Question hashes match!");
        } else {
            alert("Fail: Question hashes do not match!");
        }
    }
    else {
        alert("You need to retrieve the hash first!");
    }
  }; 
  
  const handleVerA = (e) => {
    e.preventDefault();
    const aHash_sha = web3.utils.sha3(aText);

    if (aHash.length !== 0) {
      if (aHash.includes(aHash_sha)) {
        alert("[SUCCESS] Answer Hash succesfully found!");
      } else {
        alert("[FAIL] Answer Hash is not found!");
      }
    } else {
      alert("You need to retrieve the hash first!");
    }
  };
  

  const handleRetrieve = () => {

    const getSurveyHash = window.web3_.TrustSurveyContract.methods.getSurveyHash(surveyID)
    setIsLoading(true);

    getSurveyHash.send({
      from: window.web3_.account,
      gas: 30000000,
    }).on('receipt', (receipt) => {

      const qHashOnChain = receipt.events.surveyHash.returnValues[0];
      const respHashesOnChain = receipt.events.surveyHash.returnValues[1];
      
      setQHash(qHashOnChain);
      setAHash(respHashesOnChain);
      setIsLoading(false);

    }).on('error', (error) => {
      setIsLoading(false);
      setIsFailureModalOpen(true);
      console.error(error.message);
    })
    }; 

  return (
    <div className="verifyContainer">
        {isFailureModalOpen &&
        (<Modal isOpen={isFailureModalOpen} onRequestClose={() => setIsFailureModalOpen(false)}
        className="modal_for_sr"
        overlayClassName="modal-overlay">
            <h2>Error!</h2>
            <p>Error occurred submitting your survey.</p>
            <button onClick={() => {setIsFailureModalOpen(false);}}>Close</button>
        </Modal>)}

        {isLoading && (
            <div id="loading-modal">
            <div className="spinner"></div>
            <div className="loading-text">Loading...</div>
            </div>
        )}

        <div className="subVerifyContainer">

        <div className="searchBox">
            <h1><FaCheckCircle className="verifyIcon" />Verify Survey Data Here!</h1>
            <h3>Put the <b>survey id</b> of the response that you want to verify!</h3>
            <label>Survey ID</label>
            <input
                type="text"
                value={surveyID}
                onChange={(e) => setSurveyID(e.target.value)}
                />
            <button onClick={handleRetrieve}>Retrieve</button>
            <hr className="divider" />
        </div>

        <div className="resultBox">
            <h3>Results</h3>
            <div className="hashContainer">
                <div className="hashBox">
                    <label>Question Hashes </label>
                    <textarea
                    value={qHash}
                    ></textarea>
                </div>
                <div className="hashBox">
                    <label>Answer Hashes </label>
                    <textarea
                    value={aHash.map((item) => `${item}`).join('\n')}
                    ></textarea>
                </div>
            </div>
        </div>

        <div className="VerifyBox">
            <h3> Go to below website and generate hash for below information.</h3>
            <div>
                Website: <a href="https://emn178.github.io/online-tools/keccak_256.html">https://emn178.github.io/online-tools/keccak_256.html</a> <br/>
                <h4>For a survey with 3 questions, the source of hashes would be in following format:</h4>
            </div>
            <div className="hashBoxForVerify">
                <div className="TextBox">
                    <b>Question Hashes:</b> Generate hash for "questions" of json file downloaded. <br/>
                </div>
                <div className="example">
                This should be <b>List of strings:</b> <p> Example) ["Q1","Q2","Q3"] </p>
                </div>
                <div className="TextBox">
                    <b>Answer Hashes:</b>  Slightly modify the "responses" of json file downloaded.
                </div>
                <div className="TextBox">
                    <div className="example">
                    This should be <b>Dictionary:</b><p>{DictExample}</p>
                </div>
                <i> ▶️ Then, see if the generated hash is in the above retrieved list. <b>( Please NOTE that orders and spacing MATTER!)</b></i>
                </div>
            </div>
            <hr className="divider" />
            <h3> You can do it yourself, but we can also help you verify. 😃 </h3>
           
            <label>Put Questions Here! </label>
            <div className="hashBoxForVerify">
                <textarea
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                ></textarea>
                <button className="verify-button" onClick={handleVerQ}>Verify Question</button>
            </div>

            <label>Put Answer Here! </label>
            <div className="hashBoxForVerify">
                <textarea
                value={aText}
                onChange={(e) => setAText(e.target.value)}
                ></textarea>
                <button className="verify-button" onClick={handleVerA}>Verify Answer</button>

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
