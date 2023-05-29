import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './components/main/Navbar';
import VerifyContainer from "./components/verify/VerifyContainer";
// import "./Card.css";

const Verify = () => {

  return (
    <div className="Card">
      <Navbar />
      <VerifyContainer />
      {/* <Intro />
      <CardContainer /> */}
    </div>
  );
};

export default Verify;
