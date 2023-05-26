import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/main/Navbar';
import Intro from './components/main/Intro';
import CardContainer from './components/main/CardContainer';
import WalletAddressModal from './components/main/WalletAddressModal';
import { useCookies } from 'react-cookie';

function Main() {
  const [isWalletAddressModalOpen, setIsWalletAddressModalOpen] = useState(false);
  const [cookies, setCookie] = useCookies(['walletAddress']);

  useEffect(() => {
    setIsWalletAddressModalOpen(!cookies.walletAddress);
  }, [cookies]);

  const handleCloseModal = () => {
    setIsWalletAddressModalOpen(false);
  };

  const handleSubmit = (walletAddress) => {
    setCookie('walletAddress', walletAddress, { path: '/' });
    handleCloseModal();
  };

  return (
    <div className="App">
      <Navbar />
      <Intro />
      <CardContainer />
      {/* <WalletAddressModal
        isOpen={isWalletAddressModalOpen}
        onRequestClose={handleCloseModal}  // Change to onRequestClose
        onSubmit={handleSubmit}
      /> */}
    </div>
  );
}

export default Main;
