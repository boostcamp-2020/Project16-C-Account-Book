import React, { useEffect, useState } from 'react';

import { useTransactionData } from '../../../store/AccountBook/accountBookInfoHook';
import DateInput from './DateInput';
import CategoryInput from './CategoryInput';
import PaymentInput from './PaymentInput';
import PriceInput from './PriceInput';
import MemoInput from './MemoInput';
import MessageInput from './MessageInput';
import './TransactionAddModal.scss';

const TransactionAddModal = ({
  setTransactionAddModal,
}: {
  setTransactionAddModal: (value: boolean) => void;
}) => {
  const { categoryPool, paymentPool } = useTransactionData(store => ({
    categoryPool: store.accountBook.category,
    paymentPool: store.accountBook.payment,
  }));

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(today.getDate());
  const [category, setCategory] = useState('');
  const [payment, setPayment] = useState('');

  const onOverLayClicked = (e: Event) => {
    if (e.target === e.currentTarget) setTransactionAddModal(false);
  };

  const onCategoryChange = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    const targetElement = e.target as HTMLInputElement;
    setCategory(targetElement.value);
  };

  useEffect(() => {
    console.log('category pool: ', categoryPool);
  });

  return (
    <div className="transaction__modal" onClick={onOverLayClicked}>
      <div className="form__container">
        <h2>거래내역 추가</h2>
        <form action="">
          <DateInput
            {...{ year, month, today, day, setYear, setMonth, setDay }}
          />
          <CategoryInput {...{ categoryPool, category, onCategoryChange }} />
          <PaymentInput />
          <PriceInput />
          <MemoInput />
          <MessageInput />
        </form>
      </div>
    </div>
  );
};

export default TransactionAddModal;
