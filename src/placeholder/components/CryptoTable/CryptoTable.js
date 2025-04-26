import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCoins, selectCryptoStatus, selectCryptoError } from '../../../features/crypto/cryptoSlice';
import CryptoRow from './CryptoRow';
import styles from './CryptoTable.module.css';

const CryptoTable = () => {
  const coins = useSelector(selectAllCoins);
  const status = useSelector(selectCryptoStatus);
  const error = useSelector(selectCryptoError);

  let content;

  if (status === 'loading') {
    content = <div className={styles.message}>Loading crypto data...</div>;
  } else if (status === 'succeeded') {
    const rows = coins.map((coin, index) => (
      <CryptoRow key={coin.id} coin={coin} index={index} />
    ));

    // Add placeholder rows for indices 6-10 if fewer than 10 coins
    while (rows.length < 10) {
      rows.push(
        <tr key={`placeholder-${rows.length}`} className={styles.placeholderRow}>
          <td className={styles.rank}>{rows.length}</td>
          <td className={styles.nameCell}>Placeholder Name</td>
          <td className={styles.price}>$0.00</td>
          <td className={styles.percentChange}>0.00%</td>
          <td className={styles.percentChange}>0.00%</td>
          <td className={styles.percentChange7d}>0.00%</td>
          <td className={styles.marketCap}>$0</td>
          <td className={styles.volume}>$0</td>
          <td className={styles.supply}>0</td>
          <td className={styles.maxSupply}>∞</td>
          <td className={styles.chart}>N/A</td>
        </tr>
      );
    }

    content = (
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
        <tbody>{rows}</tbody>
      </table>
    );
  } else if (status === 'failed') {
    content = <div className={`${styles.message} ${styles.error}`}>Error: {error}</div>;
  } else {
    content = <div className={styles.message}>Initializing...</div>; // Idle state
  }

  return <div className={styles.tableContainer}>{content}</div>;
};

export default CryptoTable;