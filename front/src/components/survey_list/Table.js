import React from 'react';
import './Table.css';
import { useCookies } from 'react-cookie';

const Table = ({ surveys }) => {

  const [cookies, setCookie] = useCookies(['walletAddress']);

  const formatClosingDate = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toDateString();
      return formattedDate;
    } else {
      return " ";
    }
  };

  const getNumberOfParticipants = (survey) => {
    return survey.responses.length + " / " + survey.maxAttendeeCount;
  };

  const getSticker = (survey) => {
    return (
      <div>
        {survey.publisherWalletId === window.web3_.account && (<img src="https://img.shields.io/badge/Owner-green" alt="Owner badge"></img>)}
        {survey.closed && survey.responses.some((response) => response.participantWalletId === window.web3_.account) ? (
          <img src="https://img.shields.io/badge/Rewarded-yellow" alt="Rewarded badge"></img>
        ) : (
          !survey.closed ? (<img src="https://img.shields.io/badge/Open-blue" alt="Open badge"></img>) : (<img src="https://img.shields.io/badge/Closed-red" alt="Closed badge"></img>)
        )}
        {!survey.closed && survey.responses.some((response) => response.participantWalletId === window.web3_.account) && (
          <img src="https://img.shields.io/badge/Participated-purple" alt="Participated badge"></img>
        )}
      </div>
    )
  }


  return (
    <div className="survey-table-container">
      <h1>Survey List</h1>
      <p style={{ marginTop: '10px' }}>Here, you can see all of our surveys registered. Take a look!</p>
      <div className="survey-table">
        <div className="survey-table-header">
          <div className="survey-table-cell survey-table-sticker">Status</div>
          <div className="survey-table-cell">Title</div>
          <div className="survey-table-cell">Summary</div>
          <div className="survey-table-cell">Closing Date</div>
          <div className="survey-table-cell">Reward</div>
          <div className="survey-table-cell">No. of Participants</div>
        </div>
        {surveys.map(survey => (
          <a href={`/survey?id=${survey.id}`} className="survey-table-row" key={survey.id}>
            <div className="survey-table-cell survey-table-sticker">{getSticker(survey)}</div>
            <div className="survey-table-cell survey-table-title">{survey.title}</div>
            <div className="survey-table-cell survey-table-summary">{survey.summary || " "}</div>
            <div className="survey-table-cell survey-table-closing-date">{formatClosingDate(survey.automaticClosingDatetime)}</div>
            <div className="survey-table-cell survey-table-reward">{survey.reward || " "}</div>
            <div className="survey-table-cell survey-table-max-attendee-count">{getNumberOfParticipants(survey)}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Table;
