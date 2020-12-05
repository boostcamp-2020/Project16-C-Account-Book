import React from 'react';

import styles from './TransactionItem.module.scss';
import { iTransactionItem } from '../../../../types/transaction';

const TransactionItem = ({
  category,
  content,
  payment,
  cost,
  type,
}: iTransactionItem) => {
  return (
    <div className={styles.transaction}>
      <span className={styles.category}>{category.name}</span>
      <span className={styles.description}>{content}</span>
      <span className={styles.payment}>{payment.description}</span>
      {type === '지출' ? (
        <span className={styles.cost}>{`-${cost}`}</span>
      ) : (
        <span className={styles.cost}>{`+${cost}`}</span>
      )}
    </div>
  );
};

export default TransactionItem;
