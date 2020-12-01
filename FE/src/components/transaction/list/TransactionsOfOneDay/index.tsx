import React from 'react';
import styles from './TransactionsOfOneDay.module.scss';

import TransactionItem from '../TransactionItem';
import { iTransactionsOfOneDay } from '../../../../types/transaction';

const TransactionsOfOneDay = ({ day, transactions }: iTransactionsOfOneDay) => {
  return (
    <div className={styles.day}>
      <div className={styles.daybar}>{day}일</div>
      {transactions.map(t => (
        <TransactionItem
          category={t.category}
          description={t.description}
          payment={t.payment}
          cost={t.cost}
        />
      ))}
    </div>
  );
};

export default TransactionsOfOneDay;
