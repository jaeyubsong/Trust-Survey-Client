import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './WalletAddressModal.css';

Modal.setAppElement('#root');

function WalletAddressModal({ isOpen, onRequestClose, onSubmit }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(true);

  const handleWalletAddressChange = (event) => {
    const address = event.target.value;
    setWalletAddress(address);
    setIsValidAddress(address.length >= 26 && address.length <= 35);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(walletAddress);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay"
      className="modal-content"
      shouldCloseOnOverlayClick={false}
    >
      <div className="modal-header">
        <h2 className="modal-title">Sign In</h2>
        <p className="modal-subtitle">Enter your wallet address to proceed.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={walletAddress}
          onChange={handleWalletAddressChange}
          className="modal-input"
        />
        {!isValidAddress && (
          <p style={{ color: 'red', fontSize: '14px', margin: '4px 0 0 0' }}>
            Valid Address must consist of 26-35 characters
          </p>
        )}
        <button type="submit" className={`modal-button ${!isValidAddress ? 'disabled' : ''}`} disabled={!isValidAddress}>
          Submit
        </button>
      </form>
    </Modal>
  );
}

WalletAddressModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default WalletAddressModal;
