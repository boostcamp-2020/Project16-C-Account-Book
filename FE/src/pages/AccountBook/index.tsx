import React from 'react';

import AccountBookControl from '../../components/AccountBook/AccountBookControl';
import AccountBookList from '../../components/AccountBook/AccountBookList';
import styles from './AccountBookListPage.module.scss';

export default function AccountBookListPage() {
  return (
    <div className={styles.container}>
      <AccountBookControl />
      <AccountBookList />
    </div>
  );
}
