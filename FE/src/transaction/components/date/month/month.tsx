import React from 'react';
import styles from './month.module.scss';

const Month = props => {
  const month = new Date().getMonth().toString();

  return (
    <div className={styles.month__wrapper}>
      <div className={styles.month}>{}</div>
      <div className={styles.month}>{month}</div>
      <div className={styles.month}>{}</div>
    </div>
  );
};

export default Month;
