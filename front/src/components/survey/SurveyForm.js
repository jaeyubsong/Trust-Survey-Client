<<<<<<< HEAD
  import React, { useState } from 'react';
  import { FaTrophy, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
  import './SurveyForm.css';
  import Modal from 'react-modal'; 
  import { useCookies } from 'react-cookie';
  import axios from 'axios';
=======
import React, { useState } from 'react';
import { FaTrophy, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import './SurveyForm.css';
import Modal from 'react-modal';
import { useCookies } from 'react-cookie';
>>>>>>> origin/feature/metamask-klay-contract-call-example

  const SurveyForm = ({ survey }) => {
      const [cookies] = useCookies(['walletAddress']);
      const [answers, setAnswers] = useState(survey.questions ? new Array(survey.questions.length).fill(''): '');
      const [isSuccessModalOpen, setIsSucessModalOpen] = useState(false);
      const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
      const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

      const [isAdminPageOpen, setIsAdminPageOpen] = useState(false);

<<<<<<< HEAD
      const formatClosingDate = (dateString) => {
          if (dateString) {
            const date = new Date(dateString);
            const formattedDate = date.toDateString();
            return formattedDate;
          } else {
            return " ";
          }
=======
      const handleAnswerChange = (index, event) => {
        const newAnswers = [...answers];
        newAnswers[index] = event.target.value;
        setAnswers(newAnswers);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        debugger;
        const body = {
          surveyId: survey.id,
          participantWalletId: cookies.walletAddress, // window.web3_.account
          answers,
>>>>>>> origin/feature/metamask-klay-contract-call-example
        };

        const handleAnswerChange = (index, event) => {
          const newAnswers = [...answers];
          newAnswers[index] = event.target.value;
          setAnswers(newAnswers);
        };
      
        const handleSubmit = (e) => {
          
          e.preventDefault();

          const body = {
            surveyId: survey.id,
            participantWalletId: cookies.walletAddress,
            answers,
          };


          fetch('http://3.27.95.249:8080/participate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          })
            .then((response) => {
              if (response.ok) {
                  setIsSucessModalOpen(true);                  
              } else {
                  setIsFailureModalOpen(true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
          
        };

      const isSubmitDisabled = () => {

          if (survey.responses) {
              return survey.closed || survey.responses.some((response) => response.participantWalletId === cookies.walletAddress) || survey.publisherWalletId === cookies.walletAddress;
          }
          return false;
      };

<<<<<<< HEAD
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

=======
    const isSubmitDisabled = () => {
        if (survey.responses) {
            return survey.responses.some((response) => response.participantWalletId === cookies.walletAddress);
        }
        return false;
    };

    debugger;

    return (
        <div>
        {isSuccessModalOpen && (<Modal isOpen={isSuccessModalOpen} onRequestClose={() => setIsSucessModalOpen(false)}
        className="modal_for_sr"
        overlayClassName="modal-overlay">
        <h3>✅ Completed</h3>
        <p>Your response has been recorded.</p>
            <button onClick={() => setIsSucessModalOpen(false)}>Close</button>
        </Modal>)}

        {/* Failure modal */}
        {isFailureModalOpen &&
        (<Modal isOpen={isFailureModalOpen} onRequestClose={() => setIsFailureModalOpen(false)}
        className="modal_for_sr"
        overlayClassName="modal-overlay">
            <h2>Error!</h2>
            <p>Error occurred submitting your response.</p>
            <button onClick={() => setIsFailureModalOpen(false)}>Close</button>
        </Modal>)}
>>>>>>> origin/feature/metamask-klay-contract-call-example

      // close survey
        const handleClose = (ans) => {

          if (ans === "yes") {
              const body = {
                surveyId: survey.id,
                participantWalletId: cookies.walletAddress,
              };

              axios.get(`http://3.27.95.249:8080/survey/${survey.id}/close?userWalletId=${cookies.walletAddress}`)
              .then(res => {
                // If response status is 200, proceed with the intended behavior
                if (res.status === 200) {
                  setIsCloseModalOpen(false);
                  setIsAdminPageOpen(true);
                } else {
                  // If the status is not 200, log an error message
                  setIsCloseModalOpen(false);
                  setIsFailureModalOpen(true);
                  console.error(`Error: Request returned status code ${res.status}`);
                }
            })
            .catch(err => {
              console.log(err);
            });
        }
        else {
          setIsCloseModalOpen(false); 
          setIsAdminPageOpen(false)
        }
      }
      
      return (
          <div>
          {isCloseModalOpen && (<Modal isOpen={isCloseModalOpen} onRequestClose={() => isCloseModalOpen(true)}
          className="modal_for_sr warning"
          overlayClassName="modal-overlay">
          <h3> ⚠️ Warning </h3>
          <p>Checking result will close the survey. <br/> Are you sure you want to close the survey?</p>
              <button className="yes-button" onClick={() => {handleClose("yes"); }}>Yes</button>
              <button className="cancel-button" onClick={() => {handleClose("cancel")}}>Cancel</button>
          </Modal>)}

          {isSuccessModalOpen && (<Modal isOpen={isSuccessModalOpen} onRequestClose={() => setIsSucessModalOpen(false)}
          className="modal_for_sr"
          overlayClassName="modal-overlay">
          <h3>✅ Completed</h3>
          <p>Your request has been executed.</p>
              <button onClick={() => {setIsSucessModalOpen(false); window.location.href = '/'}}>Close</button>
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
                    {cookies.walletAddress === survey.publisherWalletId
                      ? 'as you are the creator of the survey.'
                      : 'as either the survey is closed or you have already responded to this survey.'}
                  </div>
                )}
              </div>
            </div>
<<<<<<< HEAD
                          
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
                  {cookies.walletAddress === survey.publisherWalletId ? (
                    <button type="button" className="admin-btn" onClick={() => {
                      
                      if (survey.closed) {
                        setIsAdminPageOpen(true)
                      }
                      else {
                        setIsCloseModalOpen(true)
                      }
                      // setIsAdminPageOpen(true);
=======
          </div>

          <div className="survey-form-container survey-form-questions">
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
                    <button type="submit" className={`submit-btn ${isSubmitDisabled() ? 'submit-btn-disabled' : ''}`} disabled={isSubmitDisabled()}>Submit</button>
                    {cookies.walletAddress === survey.publisherWalletId ? (
                        <button type="button" className="admin-btn">Admin</button>
                    ) : (
                        <button type="button" className="admin-btn admin-btn-disabled" disabled>Admin</button>
                    )}
                </div>
        </div>
        </form>
        </div>
    );
};
>>>>>>> origin/feature/metamask-klay-contract-call-example

                    }}>
                      Check Result / Close
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`admin-btn ${cookies.walletAddress === survey.publisherWalletId ? '' : 'admin-btn-disabled'}`}
                      disabled={cookies.walletAddress !== survey.publisherWalletId}
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
          </div>
      );
  };

  export default SurveyForm;
  