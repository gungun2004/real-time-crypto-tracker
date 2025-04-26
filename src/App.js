import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCoins } from './features/crypto/cryptoSlice';
import CryptoTable from './placeholder/components/CryptoTable/CryptoTable'; // Adjusted import path
import useWebSocketSimulator from './hooks/useWebSocketSimulator'; // Import the hook
import styles from './App.module.css'; // Import App specific styles
import logo from './assets/images/crypto-logo.png'; // Import a logo image

function App() {
  const dispatch = useDispatch();

  // Fetch initial data on component mount
  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  // Start the WebSocket simulation
  useWebSocketSimulator(); // This hook manages its own lifecycle

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={logo} alt="Crypto Tracker Logo" className={styles.logo} />
        <h1>Real-Time Crypto Tracker</h1>
      </header>
      <main className={styles.appMain}>
        <CryptoTable />
      </main>
      <footer className={styles.appFooter}>
      </footer>
    </div>
  );
}

export default App;