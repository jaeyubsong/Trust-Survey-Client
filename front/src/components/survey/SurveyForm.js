import React, { useState } from 'react';
import { FaTrophy, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import './SurveyForm.css';
import Modal from 'react-modal';
import { useCookies } from 'react-cookie';

const SurveyForm = ({ survey }) => {
    const [cookies] = useCookies(['walletAddress']);
    const [answers, setAnswers] = useState(survey.questions ? new Array(survey.questions.length).fill(''): '');
    const [isSuccessModalOpen, setIsSucessModalOpen] = useState(false);
    const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);

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

      const handleSubmit = (event) => {
        event.preventDefault();
        debugger;
        const body = {
          surveyId: survey.id,
          participantWalletId: cookies.walletAddress, // window.web3_.account
          answers,
        };
        fetch('http://143.248.134.9:8080/participate', {
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
            debugger;
          });
      };

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
                    : 'as you have already responded to this survey.'}
                </div>
              )}
            </div>
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

export default SurveyForm;
