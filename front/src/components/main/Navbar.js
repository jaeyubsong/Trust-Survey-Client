import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import './Navbar.css';
import logo from '../../items/logo.png';
import { useHistory } from 'react-router-dom';

function Navbar(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['walletAddress']);
  const [walletAddress, setWalletAddress] = useState(cookies.walletAddress);
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const signOutRef = useRef(null);

  useEffect(() => {
    setWalletAddress(cookies.walletAddress);
  }, [cookies]);

  const signOut = () => {
    removeCookie('walletAddress');
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
        {walletAddress ? (
          <div>
            <div
              className="sign-out-container"
              onMouseEnter={handleSignOutHover}
              onMouseLeave={() => setShowModal(false)}
              ref={signOutRef}
            >
              <button className="sign-out-btn modern-btn" onClick={signOut}>
                Sign out
              </button>
              <div
                className={`modal ${showModal ? 'show-modal' : ''}`}
                style={{
                  top: modalPosition.y - 20,
                  left: modalPosition.x - 120,
                  width: 'auto',
                  fontSize: '11 px',
                  height: '40px',
                  padding: '10px',
                  paddingBottom: '0px',
                  marginTop: '25px',
                  backgroundColor: 'white',
                  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2) !important',
                  border: '1px solid #BEBEBE',
                  borderRadius: '10px',
                  textAlign: 'left',
                  color: '#999999'
                }}
              >
                Current Addr:<br/>
                <p style={{marginTop: '0px', fontSize: '13px', fontWeight: 'bold', color: '#333333'}}>{walletAddress}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
