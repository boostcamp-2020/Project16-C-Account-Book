import React from 'react';

import styles from './menubar.module.scss';

const MenuBar = ({ setModal }) => {
  const onClickPayment = () => {
    setModal(true);
  };
  return (
    <header className={styles.header}>
      <button className={styles.navBtn}>
        <i className="fas fa-history" />
      </button>
      <button className={styles.navBtn}>
        <i className="far fa-calendar-alt" />
      </button>
      <button className={styles.navBtn}>
        <i className="far fa-chart-bar" />
      </button>
      <button className={styles.navBtn} onClick={onClickPayment}>
        <i className="fas fa-credit-card" />
      </button>
    </header>
  );
};
export default MenuBar;
