import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/main/Navbar';
import Intro from './components/main/Intro';
import CardContainer from './components/main/CardContainer';
import WalletAddressModal from './components/main/WalletAddressModal';

function Main() {
  const [isWalletAddressModalOpen, setIsWalletAddressModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsWalletAddressModalOpen(false);
  };

  return (
    <div className="App">
      <Navbar />
      <Intro />
      <CardContainer />
    </div>
  );
}

export default Main;
