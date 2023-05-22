import React from 'react';
import "./Sidebar.css"
import { FaInfo, FaFileAlt, FaArrowLeft } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { AiFillLock} from 'react-icons/ai'

function Sidebar() {

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
        <li className="basic_info">
            <FaInfo />
            <span> Basic Info</span>
        </li>
        <li className="Participant Setting">
            <AiFillLock />
            <span> Participant Setting</span>
        </li>
        <li className="survey_creation">
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
