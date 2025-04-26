import React from 'react';
import styles from './CryptoRow.module.css';

// Helper to format large numbers
const formatNumber = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return num.toLocaleString('en-US');
};

// Helper to format currency
const formatPrice = (price) => {
  if (price === null || price === undefined) return 'N/A';
   // Adjust decimal places based on price magnitude
   if (price > 1) {
       return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
   } else {
       return price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 4, maximumFractionDigits: 8});
   }
};

// Helper to format percentages and apply color
const formatPercentage = (percent) => {
  if (percent === null || percent === undefined) return <span className={styles.neutral}>N/A</span>;
  const value = parseFloat(percent).toFixed(2);
  const sign = value >= 0 ? '+' : '';
  const className = value >= 0 ? styles.positive : styles.negative;
  return <span className={className}>{sign}{value}%</span>;
};


const CryptoRow = React.memo(({ coin, index }) => {
  // Generate points for the sparkline chart
  const generateSparklinePoints = (sparkline) => {
    if (!sparkline || sparkline.length === 0) return '';
    const maxPrice = Math.max(...sparkline);
    const minPrice = Math.min(...sparkline);
    const range = maxPrice - minPrice || 1; // Avoid division by zero

    return sparkline
      .map((price, i) => {
        const x = (i / (sparkline.length - 1)) * 100; // Scale x to 0-100
        const y = 50 - ((price - minPrice) / range) * 50; // Scale y to 0-50 (inverted)
        return `${x},${y}`;
      })
      .join(' ');
  };

  const sparklinePoints = generateSparklinePoints(coin.sparkline_in_7d?.price);

  return (
    <tr className={styles.cryptoRow}>
      <td className={styles.rank}>{index + 1}</td>
      <td className={styles.nameCell}>
        <img src={coin.image} alt={`${coin.name} logo`} className={styles.logo} />
        <div className={styles.nameSymbol}>
            <span className={styles.name}>{coin.name}</span>
            <span className={styles.symbol}>{coin.symbol?.toUpperCase()}</span>
        </div>
      </td>
      <td className={styles.price}>{formatPrice(coin.current_price)}</td>
      <td className={styles.percentChange}>{formatPercentage(coin.price_change_percentage_1h_in_currency)}</td>
      <td className={styles.percentChange}>{formatPercentage(coin.price_change_percentage_24h_in_currency)}</td>
      <td className={styles.percentChange7d}>{formatPercentage(coin.price_change_percentage_7d_in_currency)}</td>
      <td className={styles.marketCap}>{formatNumber(coin.market_cap)}</td>
      <td className={styles.volume}>{formatNumber(coin.total_volume)}</td>
      <td className={styles.supply}>{formatNumber(coin.circulating_supply)} {coin.symbol?.toUpperCase()}</td>
      <td className={styles.maxSupply}>{formatNumber(coin.max_supply) || '∞'}</td>
      <td className={styles.chart}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 50"
          className={styles.sparkline}
        >
          <polyline
            fill="none"
            stroke="#007bff"
            strokeWidth="2"
            points={sparklinePoints}
          />
        </svg>
      </td>
    </tr>
  );
});

export default CryptoRow;