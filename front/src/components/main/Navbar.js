import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import './Navbar.css';
import logo from '../../items/logo.png';
import { useHistory } from 'react-router-dom';

function Navbar(props) {
  const [walletAddress, setWalletAddress] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const signOutRef = useRef(null);

  useEffect(() => {
    window.web3_ ? (
    setWalletAddress(window.web3_.account)
    ) : setWalletAddress('')
  }, [window.web3_]);

  const signOut = () => {
    setWalletAddress(null);
    window.location.href = '/';
  };
  

  const handleSignOutHover = () => {
    const modalX = signOutRef.current.offsetLeft + signOutRef.current.offsetWidth;
    const modalY = signOutRef.current.offsetTop + signOutRef.current.offsetHeight;
    setModalPosition({ x: modalX, y: modalY });
    setShowModal(true);
  };

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
      </div>
    </nav>
  );
}

export default Navbar;
