import React from 'react';

import styles from './TransactionItem.module.scss';
import { iTransactionItem } from '../../../../types/transaction';
import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';

const TransactionItem = ({
  id,
  date,
  category,
  content,
  payment,
  cost,
  type,
}: iTransactionItem) => {
  const {
    setTransactionAddModalVisible,
    setInput,
  } = useTransactionAddModalData(store => ({
    setTransactionAddModalVisible: store.setTransactionAddModalVisible,
    setInput: store.setInput,
  }));

  const onTransactionClicked = () => {
    const dateArr = date.split('-');
    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];
    setInput({ _id: id, category, payment, cost, type, year, month, day });
    setTransactionAddModalVisible(true);
  };

  return (
    <div className={styles.transaction} onClick={onTransactionClicked}>
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
