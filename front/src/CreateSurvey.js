import React, { useState } from 'react';
import './CreateSurvey.css';
import { motion } from 'framer-motion';
import Sidebar from './components/create_survey/Sidebar';
import Navbar from './components/main/Navbar';
import Toggle from 'react-toggle';
import Modal from 'react-modal';

import 'react-toggle/style.css';

function CreateSurvey() {
  const [currentStep, setCurrentStep] = useState(1);

  /* Modal */
  const [isSuccessModalOpen, setIsSucessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);

  const handleToggleChange = () => {
    setIsPrivate(!isPrivate);
  }

  function handleAutomaticClosureChange(event) {
    setAutomaticClosure(event.target.value === 'yes');
  }

  const handleNextClick = () => {
    setCurrentStep((currentStep + 1) % 3);
  };

  const handlePrevClick = () => {
    setCurrentStep((currentStep - 1 + 3) % 3);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleQuestionChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tmp_date = new Date(automaticClosingDatetime);
    tmp_date.setHours(23, 59, 59);
    const final_date = tmp_date.toISOString().slice(0, -5) + 'Z'

    debugger;

    const surveyData = JSON.stringify({
      "publisherWalletId": publisherWalletId,
      "title": title,
      "summary": summary,
      "desc": desc,
      "privateAttendeeKey": privateAttendeeKey,
      "publicAttendeeEmailPattern": publicAttendeeEmailPattern,
      "maxAttendeeCount": Number(maxAttendeeCount),
      "automaticClosingDatetime": final_date,
      "manualClosing": automaticClosure,
      "reward": Number(reward),
      "questions": questions
    })

    debugger;

    try {
      const response = await fetch('http://143.248.134.9:8080/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: surveyData
      });

      const responseData = await response.json();

      if (response.status !== 200) {
        throw new Error('Failed to fetch data');
      }
      // Show the success modal
      setIsSucessModalOpen(true);

    } catch (error) {
      // Show the failure modal
      setIsFailureModalOpen(true); 
    }

  };


  /* VARIABLES */

  /* Form 1 */
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [desc, setDesc] = useState('');
  const [automaticClosure, setAutomaticClosure] = useState(false);
  const [automaticClosingDatetime, setAutomaticClosingDatetime] = useState('');
  const [reward, setReward] = useState(0);
  const [publisherWalletId, setPublisherWalletId] = useState('');

  /* Form 2 */
  const [isPrivate, setIsPrivate] = useState(false);
  const [privateAttendeeKey, setPrivateAttendeeKey] = useState('');
  const [publicAttendeeEmailPattern, setPublicAttendeeEmailPattern] = useState('');
  const [maxAttendeeCount, setMaxAttendeeCount] = useState(0);

  /* Form 3 */
  const [questions, setQuestions] = useState(['']);



  return (
    <div>
      <Navbar />
    <div className="wrapper">
      <Sidebar />
    <div className="survey-container-wrapper">
      <div className="survey-container">

      {/* Success modal */}
      {isSuccessModalOpen && (<Modal isOpen={isSuccessModalOpen} onRequestClose={() => setIsSucessModalOpen(false)}
       className="modal_for_sr"
       overlayClassName="modal-overlay">
      <h3>✅ Completed</h3>
      <p>Your survey has been registered.</p>
        <button onClick={() => {setIsSucessModalOpen(false); window.location.href = '/';}}>Close</button>
      </Modal>)}

      {/* Failure modal */}
      {isFailureModalOpen && 
      (<Modal isOpen={isFailureModalOpen} onRequestClose={() => setIsFailureModalOpen(false)}  
       className="modal_for_sr"
      overlayClassName="modal-overlay">
        <h2>Error!</h2>
        <p>Error occurred submitting your survey.</p>
        <button onClick={() => {setIsFailureModalOpen(false); window.location.href = '/';}}>Close</button>
      </Modal>)}

      { /* STEP 1 */ }
      {currentStep === 1 && (
      <motion.div
            className="form-container"
            initial={{ opacity: 1 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeInOut'
              }
            }}
          >
          <h2>Step 1. Basic Info</h2>
      <form className="form1">
        <div className="form-group">
          <label htmlFor="title">Survey Title:</label>
          <input type="text" id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="summary">Survey Summary:</label>
          <input type="text" id="summary" name="summary" value={summary} onChange={(event) => setSummary(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Survey Description:</label>
          <textarea id="desc" name="desc" value={desc} onChange={(event) => setDesc(event.target.value)}></textarea>
        </div>
        <div className="date_wrapper">
          <div className="form-group">
            <label>Manual Closure:</label>
            <div className="yesandno">
              <div className="radio">
                <input type="radio" id="automatic-closure-yes" name="automatic-closure" value="yes" checked={automaticClosure} onChange={handleAutomaticClosureChange} />
                <label htmlFor="automatic-closure-yes">Yes</label>
              </div>
              <div className="radio">
                <input type="radio" id="automatic-closure-no" name="automatic-closure" value="no" checked={!automaticClosure} onChange={handleAutomaticClosureChange} />
                <label htmlFor="automatic-closure-no">No</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="automaticClosingDatetime">End Date:</label>
            <input type="date" id="automaticClosingDatetime" name="automaticClosingDatetime" value={automaticClosingDatetime} onChange={(event) => setAutomaticClosingDatetime(event.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="reward">Compensation Amount (ETH)</label>
          <input type="number" id="reward" name="reward" value={reward} onChange={(event) => setReward(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="publisherWalletId">Your Wallet Address</label>
          <input type="text" id="publisherWalletId" name="publisherWalletId" value={publisherWalletId} onChange={(event) => setPublisherWalletId(event.target.value)} />
        </div>
        <button type="button" onClick={handleNextClick}>
          <i className="fas fa-arrow-right"> Next </i>
        </button>
    </form>
        </motion.div>
    )}


      { /* Step 2 */ }
      {currentStep === 2 && ( <motion.div
          className="form-container"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeInOut'
            }
          }}
        >
          
          <h2>Step 2. Participant Setting</h2>
          <h4>- Set who and how many participants can join your survey!</h4>
          <form className="form2">
          <div className="form-group">
            <label htmlFor="privateToggle">
              <b>🔒 Set this survey as private</b>
            </label>
            <Toggle id="privateToggle" onChange={handleToggleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="privateAttendeeKey">Private Attendee Key:</label>
            <input
              type="text"
              id="privateAttendeeKey"
              name="privateAttendeeKey"
              disabled={!isPrivate}
              value={privateAttendeeKey}
              onChange={(e) => setPrivateAttendeeKey(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="publicAttendeeEmailPattern">
              Private Email Pattern:
            </label>
            <input
              type="text"
              id="publicAttendeeEmailPattern"
              name="publicAttendeeEmailPattern"
              disabled={!isPrivate}
              value={publicAttendeeEmailPattern}
              onChange={(e) => setPublicAttendeeEmailPattern(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxAttendeeCount">Number of Participants:</label>
            <input
              type="number"
              id="maxAttendeeCount"
              name="maxAttendeeCount"
              value={maxAttendeeCount}
              onChange={(e) => setMaxAttendeeCount(e.target.value)}
            />
          </div>
          <button type="button" onClick={handlePrevClick}>
            <i className="fas fa-arrow-left"> Back </i>
          </button>
          <button type="button" onClick={handleNextClick}>
            <i className="fas fa-arrow-right"> Next </i>
          </button>
        </form>

        </motion.div>
      )}
   

    { /* STEP 3 */ }
    {currentStep === 0   && ( <motion.div
          className="form-container"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeInOut'
            }
          }}
        >
          <h2>Step 3. Survey Design</h2>
          <h4>- Design your survey here</h4>
          <form className="form3" onSubmit={handleSubmit}>
            {questions.map((question, index) => (
              <div className="form-group" key={index}>
                <label htmlFor={`q${index}`}>Question {index + 1}:</label>
                <input
                  type="text"
                  id={`q${index}`} 
                  name={`q${index}`}
                  value={question}
                  onChange={(event) => handleQuestionChange(event, index)}
                /> 
              </div>
            ))}
            <button type="button" onClick={handlePrevClick}>
              Back
            </button>
            <button type="button" className="add_question" onClick={handleAddQuestion}>
              Add Question
            </button>
            <button type="submit">Create Survey</button>
          </form>
        </motion.div>
    )}
      </div>
    </div>
    </div>
    </div>

  );
}

export default CreateSurvey;
