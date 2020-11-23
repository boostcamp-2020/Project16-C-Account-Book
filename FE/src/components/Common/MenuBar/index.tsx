import React from 'react';
import styles from './menubar.module.scss';

const MenuBar = ({ setModal }) => {
  const onClickPayment = () => {
    setModal(true);
  };
  return (
    <header className={styles.header}>
      <button>내역</button>
      <button>캘린더</button>
      <button>차트</button>
      <button onClick={onClickPayment}>결제수단</button>
    </header>
  );
};
export default MenuBar;
