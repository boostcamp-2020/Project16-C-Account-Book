import React, { useState } from 'react';

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
  const [buttonReveal, setButtonReveal] = useState('');

  const {
    setTransactionAddModalVisible,
    setInput,
  } = useTransactionAddModalData(store => ({
    setTransactionAddModalVisible: store.setTransactionAddModalVisible,
    setInput: store.setInput,
  }));

  const onTransactionClicked = () => {
    if (buttonReveal === 'reveal') setButtonReveal('hide');
    else setButtonReveal('reveal');
  };

  const onModifyButtonClicked = () => {
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
      <div className={`transaction__item__button__container ${buttonReveal}`}>
        <button
          type="button"
          className="transaction__item__modify__button"
          onClick={onModifyButtonClicked}
        >
          수정
        </button>
        <button
          type="button"
          className="transaction__item__delete__button"
          onClick={onDeleteButtonClicked}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
