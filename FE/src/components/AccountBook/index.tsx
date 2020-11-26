import React from 'react';

import styles from './AccountBookList.module.scss';

export default function AccountBookList() {
  return (
    <div className={styles.acbook__list}>
      <div className={styles.acbook}>메인 가계부</div>
      <div className={styles.acbook}>취미생활 가계부</div>
      <div className={styles.acbook}>여행 가계부</div>
    </div>
  );
}
