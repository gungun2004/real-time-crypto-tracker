import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCoinData, selectAllCoins } from '../features/crypto/cryptoSlice';

const SIMULATION_INTERVAL_MS = 1500; // Update interval (1.5 seconds)

const useWebSocketSimulator = () => {
  const dispatch = useDispatch();
  const coins = useSelector(selectAllCoins);

  useEffect(() => {
    if (coins.length === 0) {
      // Don't start simulation if there's no data yet
      return;
    }

    const intervalId = setInterval(() => {
      // Select a random coin to update
      const randomIndex = Math.floor(Math.random() * coins.length);
      const coinToUpdate = coins[randomIndex];

      if (!coinToUpdate) return; // Should not happen, but safety check

      // Simulate random percentage changes (small fluctuations)
      const priceChangePercent = (Math.random() - 0.5) * 0.5; // Fluctuate by +/- 0.25%
      const volumeChangePercent = (Math.random() - 0.3) * 5; // Fluctuate volume more (-1.5% to +3.5%)

      // Calculate new values
      const newPrice = coinToUpdate.current_price * (1 + priceChangePercent / 100);
      const newVolume = coinToUpdate.total_volume * (1 + volumeChangePercent / 100);

      // Simulate changes in percentage fields (make them slightly random too)
      const new1h = (coinToUpdate.price_change_percentage_1h_in_currency || 0) + (Math.random() - 0.5) * 0.1;
      const new24h = (coinToUpdate.price_change_percentage_24h_in_currency || 0) + (Math.random() - 0.5) * 0.2;
      const new7d = (coinToUpdate.price_change_percentage_7d_in_currency || 0) + (Math.random() - 0.5) * 0.5;


      // Prepare the payload for the Redux action
      const updatePayload = {
        id: coinToUpdate.id,
        changes: {
          current_price: newPrice,
          total_volume: newVolume,
          price_change_percentage_1h_in_currency: new1h,
          price_change_percentage_24h_in_currency: new24h,
          price_change_percentage_7d_in_currency: new7d,
        },
      };

      // Dispatch the update action
      dispatch(updateCoinData(updatePayload));

    }, SIMULATION_INTERVAL_MS);

    // Cleanup function to clear the interval when the component unmounts or dependencies change
    return () => clearInterval(intervalId);

  }, [dispatch, coins]); // Rerun effect if dispatch or coins array reference changes
};

export default useWebSocketSimulator;