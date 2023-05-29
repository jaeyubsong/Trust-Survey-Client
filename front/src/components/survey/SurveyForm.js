  import React, { useState, useEffect } from 'react';
  import { FaTrophy, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
  import './SurveyForm.css';
  import Modal from 'react-modal'; 
  import axios from 'axios';
  import stringify from 'json-stable-stringify';
  import web3 from 'web3';

  const SurveyForm = ({ survey }) => {
      const [answers, setAnswers] = useState(survey.questions ? new Array(survey.questions.length).fill(''): '');
      const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
      const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
      const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
      const [isAdminPageOpen, setIsAdminPageOpen] = useState(false);
      const [isLoading, setIsLoading] = useState(false);


      const [accountID, setAccountID] = useState('');

      useEffect(() => {
        if (window.web3_) {
          setAccountID(window.web3_.account);
        }
      }, [window.web3_]);

      const formatClosingDate = (dateString) => {
          if (dateString) {
            const date = new Date(dateString);
            const formattedDate = date.toDateString();
            return formattedDate;
          } else {
            return " ";
          }
        };

        const handleAnswerChange = (index, event) => {
          const newAnswers = [...answers];
          newAnswers[index] = event.target.value;
          setAnswers(newAnswers);
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          setIsLoading(true);
          const pWID = accountID;
          
          const body = {
            surveyId: survey.id,
            participantWalletId: pWID,
            answers,
          };

          const ordered_json = stringify(body);
          const responseHash = web3.utils.sha3(ordered_json) // keccak-256  

          const participateSurvey = window.web3_.TrustSurveyContract.methods.participateSurvey(survey.id, responseHash)
          debugger;
          participateSurvey.send({
            from: window.web3_.account,
            gas: 3000000,
            value: 0
          }).on('receipt', (receipt) => {

            fetch('http://3.27.95.249:8080/participate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            })
              .then((response) => {
                if (response.ok) {  
                  setIsLoading(false);
                  setIsSuccessModalOpen(true);
                } else {
                  setIsFailureModalOpen(true);
                }
              })
              .catch((error) => {
                setIsFailureModalOpen(true);
                console.log(error);
              });            
          })
          .on('error', (error) => {
            debugger;
            setIsLoading(false);
            console.log(error);
            setIsFailureModalOpen(true); 
          })
    


            
        };
        

      const isSubmitDisabled = () => {

          if (survey.responses) {
              return survey.closed || survey.responses.some((response) => response.participantWalletId === accountID) || survey.publisherWalletId === accountID;
          }
          return false;
      };

      const handleDownloadJSON = () => {
        const jsonData = JSON.stringify(survey);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.href = url;
        link.download = 'survey_result.json';
    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
        // Optionally, you can revoke the URL after the download
        URL.revokeObjectURL(url);
      };


      // close survey
        const handleClose = (ans) => {
          
          if (ans === "yes") {

            setIsCloseModalOpen(false);
            setIsLoading(true);

            const body = {
              surveyId: survey.id,
              participantWalletId: accountID
            };

            const closeSurvey = window.web3_.TrustSurveyContract.methods.closeSurvey(survey.id)
            
            closeSurvey.send({
              from: window.web3_.account,
              gas: 200000, // arbitrary gaslimit based on https://github.com/klaytn/countbapp/blob/main/src/components/Count.js
            }).on('receipt', (receipt) => {
              
              axios.get(`http://3.27.95.249:8080/survey/${survey.id}/close?userWalletId=${accountID}`)
              .then(res => {
                // If response status is 200, proceed with the intended behavior
                if (res.status === 200) {
                  setIsLoading(false);
                  console.log(receipt);
                  setIsAdminPageOpen(true);  
                }
                else {
                  setIsLoading(false);
                  setIsAdminPageOpen(false); 
                  setIsFailureModalOpen(true);
                }
              })
            }).on('error', (error) => {
              setIsLoading(false);
              setIsFailureModalOpen(true);
              console.error(error.message);
            })
          }

        else {
          setIsCloseModalOpen(false); 
          setIsAdminPageOpen(false);
        }
      };

      const handleVerifyData = (e) => {
        e.preventDefault();
        const orderedResponses = survey.responses.map(resp => (stringify({surveyId: survey.id, ...resp})));
        console.log(orderedResponses);
        const respHashes = orderedResponses.map(resp => web3.utils.sha3(resp));
        console.log(respHashes);
        const orderedQuestions = stringify(survey.questions);
        console.log(orderedQuestions);
        const qHash = web3.utils.sha3(orderedQuestions);
        console.log(qHash);
        alert(`-- copy below string into keccak256 calculator--\nOriginal questions${orderedQuestions}\nOriginal response: ${orderedResponses}`)
        setIsLoading(true);

        const getSurveyHash = window.web3_.TrustSurveyContract.methods.getSurveyHash(survey.id)

        getSurveyHash.send({
          from: window.web3_.account,
          gas: 3000000, // arbitrary gaslimit based on https://github.com/klaytn/countbapp/blob/main/src/components/Count.js
        }).on('receipt', (receipt) => {

          console.log(receipt);
          setIsLoading(false);
          alert("Compare these hashes with what you calculated.\nQuestion Hash in chain: 0x1234\nAnswer Hashes in chain: [0x1, 0x2, ...]")
        }).on('error', (error) => {
          setIsLoading(false);
          setIsFailureModalOpen(true);
          console.error(error.message);
        })
      }

            
    
      return (
          <div>
          {isLoading && (
            <div id="loading-modal">
              <div className="spinner"></div>
              <div className="loading-text">Loading...</div>
            </div>
          )}

          {isCloseModalOpen && (<Modal isOpen={isCloseModalOpen} onRequestClose={() => isCloseModalOpen(true)}
          className="modal_for_sr warning"
          overlayClassName="modal-overlay">
          <h3> ⚠️ Warning </h3>
          <p>Checking result will close the survey. <br/> Are you sure you want to close the survey?</p>
              <button className="yes-button" onClick={() => {handleClose("yes"); }}>Yes</button>
              <button className="cancel-button" onClick={() => {handleClose("cancel")}}>Cancel</button>
          </Modal>)}

          {isSuccessModalOpen && (<Modal isOpen={isSuccessModalOpen} onRequestClose={() => setIsSuccessModalOpen(false)}
          className="modal_for_sr"
          overlayClassName="modal-overlay">
          <h3>✅ Completed</h3>
          <p>Your request has been executed.</p>
              <button onClick={() => {setIsSuccessModalOpen(false); window.location.href = '/'}}>Close</button>
          </Modal>)}

          {/* Failure modal */}
          {isFailureModalOpen && 
          (<Modal isOpen={isFailureModalOpen} onRequestClose={() => setIsFailureModalOpen(false)}  
          className="modal_for_sr"
          overlayClassName="modal-overlay">
              <h2>Error!</h2>
              <p>Error occurred executing your request.</p>
              <button onClick={() => setIsFailureModalOpen(false)}>Close</button>
          </Modal>)}

          <form onSubmit={handleSubmit}>
            <div className="survey-form-container">
              <div className="survey-form-header">
                <h1>{survey.title}</h1>
                <p>{survey.desc}</p>
                <div className="survey-form-metadata">
                  <p>
                    <FaTrophy /> {survey.reward}
                  </p>
                  <p>
                    <FaCalendarAlt /> {formatClosingDate(survey.automaticClosingDatetime)}
                  </p>
                  <p>
                    <FaUserFriends /> {survey.responses ? survey.responses.length : 0} /{' '}
                    {survey.maxAttendeeCount}
                  </p>
                </div>
                {isSubmitDisabled() && (
                  <div className="error_message">
                    You can't participate{' '}
                    {accountID === survey.publisherWalletId
                      ? 'as you are the creator of the survey.'
                      : 'as either the survey is closed or you have already responded to this survey.'}
                  </div>
                )}
              </div>
            </div>
                          
            {!isAdminPageOpen ? (<div className="survey-form-container survey-form-questions">
              <h2>Questions</h2>
              <ol>
                {survey.questions &&
                  survey.questions.map((question, index) => (
                    <li key={index}>
                      <div className="survey-question">
                        <label>{question}</label>
                        <textarea
                          name={`answer-${index}`}
                          rows="4"
                          value={answers[index]}
                          onChange={(event) => handleAnswerChange(index, event)}
                        />
                      </div>
                    </li>
                  ))}
              </ol>
              
                <div className="survey-form-footer">
                  <button
                    type="submit"
                    className={`submit-btn ${isSubmitDisabled() ? 'submit-btn-disabled' : ''}`}
                    disabled={isSubmitDisabled()}
                  >
                    Submit
                  </button>
                  {accountID === survey.publisherWalletId ? (
                    <button type="button" className="admin-btn" onClick={() => {
                      
                      if (survey.closed) {
                        setIsAdminPageOpen(true)
                      }
                      else {
                        setIsCloseModalOpen(true)
                      }
                      // setIsAdminPageOpen(true);

                    }}>
                      Check Result / Close
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`admin-btn ${accountID === survey.publisherWalletId ? '' : 'admin-btn-disabled'}`}
                      disabled={accountID !== survey.publisherWalletId}
                    >
                      Admin
                    </button>
                  )}
                </div> 
              </div> ): 
              
              ( 
                <div className="survey-form-container survey-form-questions">
                    <h2>Answers Collected</h2>
                    <button type="button" class="download-button" onClick={() => {handleDownloadJSON()}}> Download JSON</button>
                      {survey.questions &&
                        survey.questions.map((question, index) => (
                          <div key={index}>
                            Q{index+1}. {question}
                            <table className="response-table">
                              <thead>
                                <tr>
                                  <th>Participant</th>
                                  <th>Answer</th>
                                </tr>
                              </thead>
                              <tbody>
                                {survey.responses &&
                                  survey.responses.map((response, responseIndex) => (
                                    <tr key={responseIndex}>
                                      <td>{response.participantWalletId}</td>
                                      <td>{response.answers[index]}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        ))}
                    </div>
              
              )
              }
            </form>
          <button onClick={handleVerifyData}>Verify Data</button>
          </div>
      );
  };

  export default SurveyForm;
  