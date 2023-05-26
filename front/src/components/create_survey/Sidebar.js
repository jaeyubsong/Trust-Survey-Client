import React from 'react';
import "./Sidebar.css"
import { FaInfo, FaFileAlt, FaArrowLeft } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { AiFillLock} from 'react-icons/ai';

function Sidebar({ currentStep }) {

  const handleBackToHomepage = () => {
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
        {/* <div className="back" onClick={handleBackToHomepage} style={{cursor: "pointer"}}>
            <FaArrowLeft />
            <span> Back to Homepage</span>
        </div> */}
      <h2>Progress</h2>
      <ul>
        <li className={currentStep === 1 ? "basic_info active" : "basic_info"}>
            <FaInfo />
            <span> Basic Info</span>
        </li>
        <li className={currentStep === 2 ? "participant_setting active" : "participant_setting"}>
            <AiFillLock />
            <span> Participant Setting</span>
        </li>
        <li className={currentStep === 0 ? "survey_creation active" : "survey_creation"}>
            <FaFileAlt />
            <span> Survey Creation</span>
        </li>
        <li className="confirm">
            <FiEdit />
            <span> Confirm</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
