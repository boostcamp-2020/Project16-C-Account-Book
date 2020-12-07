import React from 'react';
import styles from './TransactionsOfOneDay.module.scss';

import TransactionItem from '../TransactionItem';
import { iTransactionsOfOneDay } from '../../../../types/transaction';

const TransactionsOfOneDay = ({
  date,
  transactions,
}: iTransactionsOfOneDay) => {
  return (
    <div className={styles.day}>
      <div className={styles.daybar}>{date}일</div>
      {transactions.map(t => (
        <TransactionItem
          date={date}
          category={t.category}
          content={t.content}
          payment={t.payment}
          cost={t.cost}
          type={t.type}
          id={t._id}
          key={t._id}
        />
      ))}
    </div>
  );
};

export default TransactionsOfOneDay;
