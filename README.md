# Real-Time Crypto Price Tracker (React + Redux Toolkit)

This application displays cryptocurrency prices fetched from the CoinGecko API and simulates real-time updates using React and Redux Toolkit for state management.

![New Website Blue Mockup Instagram - Laptop](https://github.com/user-attachments/assets/94d10392-aea0-4255-b2e9-16f57b4ad5e7)

## Features

- Displays key data for selected cryptocurrencies in a responsive table.
- Fetches initial data from the CoinGecko API.
- Simulates real-time price, volume, and percentage changes every ~1.5 seconds.
- Uses Redux Toolkit for state management (`createSlice`, `createAsyncThunk`, `configureStore`).
- Styled with CSS Modules for component-scoped styles.
- Color-coded percentage changes (Green for positive, Red for negative).
- Responsive table layout adapts to smaller screens.
- Includes loading and error states.

## Tech Stack

- **Frontend:** React
- **State Management:** Redux Toolkit, React-Redux
- **API Client:** Axios
- **Styling:** CSS Modules, Plain CSS
- **API:** CoinGecko API (v3)
- **Build Tool:** Create React App
  
  ![Gray Minimalist Notification Spa Your Story ](https://github.com/user-attachments/assets/7f53b2c5-05aa-4851-936f-ef2a3b77b808)


## Architecture

- **`src/App.js`:** Main application component, orchestrates initial data fetch and simulation setup.
- **`src/components/CryptoTable`:** Contains the `CryptoTable` component (renders the table structure) and `CryptoRow` component (renders a single row).
- **`src/features/crypto`:** Contains Redux logic:
  - `cryptoSlice.js`: Defines the Redux state slice (initial state, reducers, async thunk for fetching, selectors).
  - `cryptoAPI.js`: Handles communication with the CoinGecko API.
- **`src/hooks/useWebSocketSimulator.js`:** Custom hook encapsulating the `setInterval` logic to simulate data updates and dispatch Redux actions.
- **`src/app/store.js`:** Configures the Redux store.
- **`src/assets`:** Static assets (e.g., placeholder chart SVG).
- **Styling:** CSS Modules (`*.module.css`) are used for component-scoped styles. Global styles are in `src/index.css`.

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone 
   git clone https://github.com/gungun2004/real-time-crypto-tracker
   cd crypto-tracker
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm start
   ```
   The application will open automatically in your browser at `http://localhost:3000`.

## Demo Video



https://github.com/user-attachments/assets/a880fefb-ab64-4462-85ec-c06a0ec30b86



---
