import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMarketData } from './cryptoAPI';

// Async thunk for fetching initial data
export const fetchCoins = createAsyncThunk('crypto/fetchCoins', async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true');
  if (!response.ok) {
    throw new Error('Failed to fetch coins data');
  }
  return await response.json();
});

const initialState = {
  coins: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    // Reducer to update coin data based on simulated WebSocket message
    updateCoinData: (state, action) => {
      const { id, changes } = action.payload;
      const coinIndex = state.coins.findIndex(coin => coin.id === id);
      if (coinIndex !== -1) {
        
        // Merge the changes into the existing coin data
        state.coins[coinIndex] = { ...state.coins[coinIndex], ...changes };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

// Export the action creator
export const { updateCoinData } = cryptoSlice.actions;

// Export selectors
export const selectAllCoins = (state) => state.crypto.coins;
export const selectCryptoStatus = (state) => state.crypto.status;
export const selectCryptoError = (state) => state.crypto.error;

// Export the reducer
export default cryptoSlice.reducer;