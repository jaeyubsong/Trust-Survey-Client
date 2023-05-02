import React from 'react';
import './Navbar.css';
import logo from '../../items/logo.png'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left"> 
        <img src={logo} className="logo" alt="Logo" />
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
          <a href="/about" className="nav-link">About</a>
        </li>
        <li className="nav-item">
          <a href="/contact" className="nav-link">Contact</a>
        </li>
        <li className="nav-item">
          <a href="/members" className="nav-link">Members</a>
        </li>
        <li className="nav-item">
          <a href="/trend" className="nav-link">Trend</a>
        </li>
      </ul>
      <div className="separator"></div>
      <div className="navbar-right">
        <button className="sign-in-btn modern-btn">Sign In</button>
      </div>
    </nav>
  );
}

export default Navbar;