import axios from 'axios';

// Use CoinGecko API
const API_BASE_URL = 'https://api.coingecko.com/api/v3';

// Define the coins we want to track
const COIN_IDS = ['bitcoin', 'ethereum', 'tether', 'ripple', 'cardano']; // Example: BTC, ETH, USDT, XRP, ADA
const VS_CURRENCY = 'usd';

export const fetchMarketData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: VS_CURRENCY,
        ids: COIN_IDS.join(','),
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false, // We'll use a placeholder for simplicity, set to true if you want real sparkline data
        price_change_percentage: '1h,24h,7d',
      },
    });
    // console.log("API Response Data:", response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    // In a real app, handle this more gracefully (e.g., return error state)
    throw error;
  }
};