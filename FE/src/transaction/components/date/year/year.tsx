import React from 'react';
import styles from './year.module.scss';

const Year = props => {
  const year = new Date().getFullYear();

  return (
    <div className={styles.year__wrapper}>
      <div className={styles.year}>{year - 1}</div>
      <div className={styles.year}>{year}</div>
      <div className={styles.year}>{year + 1}</div>
    </div>
  );
};

export default Year;
