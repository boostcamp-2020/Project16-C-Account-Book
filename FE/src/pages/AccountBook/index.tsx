import React from 'react';

import AccountBookList from '../../components/AccountBook';
import styles from './AccountListPage.module.scss';

export default function AccountListPage() {
  return (
    <div className={styles.container}>
      <h1>가계부 리스트</h1>
      <AccountBookList />
    </div>
  );
}
