import React from 'react';
import { PlusCircleIcon } from '@primer/octicons-react';

import styles from './AccountBookControl.module.scss';
import { AccountBookContext } from '../../../store/AccountBook/account-book.context.tsx';

export default function AccountBookControl() {
  const store = React.useContext(AccountBookContext);

  const createAccountBook = () => {
    store.Create = true;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>가계부 리스트</h1>
      <div className={styles.control} onClick={createAccountBook}>
        <PlusCircleIcon className={styles.plus} size={24} />
        <h2>새 가계부 추가</h2>
      </div>
    </div>
  );
}
