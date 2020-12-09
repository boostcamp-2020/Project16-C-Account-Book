import React from 'react';

import './index.scss';
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
    setInput({
      _id: id,
      category,
      payment,
      cost,
      type,
      year,
      month,
      day,
      content,
    });
    setTransactionAddModalVisible(true);
  };

  return (
    <div className="transaction__item" onClick={onTransactionClicked}>
      <div className="transaction__item__category">
        <span>{category.name}</span>
      </div>
      <div className="transaction__item__description">{content}</div>
      <div className="transaction__item__payment">{payment.name}</div>
      {type === '지출' ? (
        <span className="transaction__item__cost transaction__item__out">{`-${cost}`}</span>
      ) : (
        <span className="transaction__item__cost transaction__item__in">{`+${cost}`}</span>
      )}
    </div>
  );
};

export default TransactionItem;
