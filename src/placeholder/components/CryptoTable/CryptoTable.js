import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllCoins, selectCryptoStatus, selectCryptoError } from '../../../features/crypto/cryptoSlice';
import styles from './CryptoTable.module.css';

const formatNumber = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return num.toLocaleString('en-US');
};

const formatPrice = (price) => {
  if (price === null || price === undefined) return 'N/A';
  if (price > 1) {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  } else {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4, maximumFractionDigits: 8 });
  }
};

const formatPercentage = (percent) => {
  if (percent === null || percent === undefined) return 'N/A';
  return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
};

const generateSparklinePoints = (sparkline) => {
  if (!sparkline || sparkline.length === 0) return '';
  const maxPrice = Math.max(...sparkline);
  const minPrice = Math.min(...sparkline);
  const range = maxPrice - minPrice || 1;

  return sparkline
    .map((price, i) => {
      const x = (i / (sparkline.length - 1)) * 100;
      const y = 50 - ((price - minPrice) / range) * 50;
      return `${x},${y}`;
    })
    .join(' ');
};

const CryptoTable = () => {
  const coins = useSelector(selectAllCoins);
  const status = useSelector(selectCryptoStatus);
  const error = useSelector(selectCryptoError);

  const [showAllRows, setShowAllRows] = useState(false);

  let content;

  if (status === 'loading') {
    content = <div className={styles.message}>Loading crypto data...</div>;
  } else if (status === 'succeeded') {
    const rows = coins.map((coin, index) => (
      <tr key={coin.id}>
        <td data-label="#">{index + 1}</td>
        <td data-label="Name">
          <img src={coin.image} alt={`${coin.name} logo`} className={styles.logo} />
          {coin.name}
        </td>
        <td data-label="Price">{formatPrice(coin.current_price)}</td>
        <td data-label="1h %">{formatPercentage(coin.price_change_percentage_1h_in_currency)}</td>
        <td data-label="24h %">{formatPercentage(coin.price_change_percentage_24h_in_currency)}</td>
        <td data-label="7d %">{formatPercentage(coin.price_change_percentage_7d_in_currency)}</td>
        <td data-label="Market Cap">{formatNumber(coin.market_cap)}</td>
        <td data-label="Volume">{formatNumber(coin.total_volume)}</td>
        <td data-label="Circulating Supply">{formatNumber(coin.circulating_supply)}</td>
        <td data-label="Max Supply">{formatNumber(coin.max_supply) || '∞'}</td>
        <td data-label="Last 7 Days">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 50"
            className={styles.sparkline}
          >
            <polyline
              fill="none"
              stroke="#007bff"
              strokeWidth="2"
              points={generateSparklinePoints(coin.sparkline_in_7d?.price)}
            />
          </svg>
        </td>
      </tr>
    ));

    const visibleRows = showAllRows ? rows : rows.slice(0, 10);

    content = (
      <>
        <table className={styles.cryptoTable}>
          <thead>
            <tr>
              <th className={styles.headerRank}>#</th>
              <th className={styles.headerName}>Name</th>
              <th className={styles.headerPrice}>Price</th>
              <th className={styles.header1h}>1h %</th>
              <th className={styles.header24h}>24h %</th>
              <th className={styles.header7d}>7d %</th>
              <th className={styles.headerMarketCap}>Market Cap</th>
              <th className={styles.headerVolume}>Volume(24h)</th>
              <th className={styles.headerSupply}>Circulating Supply</th>
              <th className={styles.headerMaxSupply}>Max Supply</th>
              <th className={styles.headerChart}>Last 7 Days</th>
            </tr>
          </thead>
          <tbody>{visibleRows}</tbody>
        </table>
        {rows.length > 10 && (
          <button
            className={styles.viewMoreButton}
            onClick={() => setShowAllRows(!showAllRows)}
          >
            {showAllRows ? 'View Less' : 'View More'}
          </button>
        )}
      </>
    );
  } else if (status === 'failed') {
    content = <div className={`${styles.message} ${styles.error}`}>Error: {error}</div>;
  } else {
    content = <div className={styles.message}>Initializing...</div>;
  }

  return <div className={styles.tableContainer}>{content}</div>;
};

export default CryptoTable;