import React from 'react';

import styles from './TransactionItem.module.scss';
import { iTransactionItem } from '../../../../types/transaction';

const TransactionItem = ({
  category,
  description,
  payment,
  cost,
}: iTransactionItem) => {
  return (
    <div className={styles.transaction}>
      <span className={styles.category}>{category}</span>
      <span className={styles.description}>{description}</span>
      <span className={styles.payment}>{payment}</span>
      <span className={styles.cost}>{cost}</span>
    </div>
  );
};

export default TransactionItem;
