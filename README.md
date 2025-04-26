# Real-Time Crypto Price Tracker (React + Redux Toolkit)

This application displays cryptocurrency prices fetched from the CoinGecko API and simulates real-time updates using React and Redux Toolkit for state management.

## Features

*   Displays key data for selected cryptocurrencies (BTC, ETH, USDT, XRP, ADA) in a responsive table.
*   Fetches initial data from the CoinGecko API.
*   Simulates real-time price, volume, and percentage changes every ~1.5 seconds using `setInterval`.
*   Uses Redux Toolkit for all application state management (`createSlice`, `createAsyncThunk`, `configureStore`).
*   Uses CSS Modules for styling (No Tailwind/PostCSS).
*   Color-codes percentage changes (Green for positive, Red for negative).
*   Responsive table layout hides less critical columns on smaller screens.
*   Includes loading and error states.

## Tech Stack

*   **Frontend:** React
*   **State Management:** Redux Toolkit, React-Redux
*   **API Client:** Axios
*   **Styling:** CSS Modules, Plain CSS
*   **API:** CoinGecko API (v3)
*   **Build Tool:** Create React App

## Architecture

*   **`src/App.js`:** Main application component, orchestrates initial data fetch and simulation setup.
*   **`src/components/CryptoTable`:** Contains the `CryptoTable` component (renders the table structure) and `CryptoRow` component (renders a single row, memoized for performance).
*   **`src/features/crypto`:** Contains Redux logic:
    *   `cryptoSlice.js`: Defines the Redux state slice (initial state, reducers, async thunk for fetching, selectors).
    *   `cryptoAPI.js`: Handles communication with the CoinGecko API.
*   **`src/hooks/useWebSocketSimulator.js`:** Custom hook encapsulating the `setInterval` logic to simulate data updates and dispatch Redux actions.
*   **`src/app/store.js`:** Configures the Redux store.
*   **`src/assets`:** Static assets (e.g., placeholder chart SVG).
*   **Styling:** CSS Modules (`*.module.css`) are used for component-scoped styles. Global styles are in `src/index.css`.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd crypto-tracker
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm start
    ```
    The application will open automatically in your browser at `http://localhost:3000`.

## Demo video 


[Watch the full video walkthrough](https://via.placeholder.com/your-video-link)

**(Replace the placeholder links with actual links to your demo GIF and video walkthrough)**