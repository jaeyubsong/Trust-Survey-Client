import React, { useState } from 'react';
import './CreateSurvey.css';
import { motion } from 'framer-motion';

function CreateSurvey() {
  const [isFirstContainerVisible, setIsFirstContainerVisible] = useState(true);
  const [questions, setQuestions] = useState(['']);

  const handleNextClick = () => {
    setIsFirstContainerVisible(false);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleQuestionChange = (event, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  return (
    <div className="survey-container-wrapper">
      <div className="survey-container">
        <motion.div
          className="form-container"
          initial={{ opacity: 1 }}
          animate={{
            opacity: isFirstContainerVisible ? 1 : 0,
            transition: {
              duration: 0.3,
              ease: 'easeInOut'
            }
          }}
          style={{ display: isFirstContainerVisible ? 'block' : 'none' }}
        >
          <h1>Create Survey</h1>
          <form>
            <div className="form-group">
              <label htmlFor="title">Survey Title:</label>
              <input type="text" id="title" name="title" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Survey Description:</label>
              <textarea id="description" name="description"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="participants">Number of Participants:</label>
              <input type="number" id="participants" name="participants" />
            </div>
            <div className="form-group">
              <label htmlFor="enddate">End Date:</label>
              <input type="date" id="enddate" name="enddate" />
            </div>
            <div className="form-group">
              <label htmlFor="compensation">Compensation Amount (ETH)</label>
              <input type="number" id="compensation" name="compensation" />
            </div>
            <button type="button" onClick={handleNextClick}>
              <i className="fas fa-arrow-right"> Next </i>
            </button>
          </form>
        </motion.div>
        <motion.div
          className="form-container"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isFirstContainerVisible ? 0 : 1,
            transition: {
              duration: 0.3,
              ease: 'easeInOut'
            }
          }}
          style={{ display: isFirstContainerVisible ? 'none' : 'block' }}
        >
          <h1>Survey Design</h1>
          <h4>- Design your survey here</h4>
          <form>
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
            <button type="button" onClick={handleAddQuestion}>
              Add Question
            </button>
            <button type="submit">Create Survey</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default CreateSurvey;
