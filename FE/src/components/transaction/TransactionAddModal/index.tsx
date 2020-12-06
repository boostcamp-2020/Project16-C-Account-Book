import React, { FormEvent, useEffect, useState } from 'react';

import { useTransactionData } from '../../../store/AccountBook/accountBookInfoHook';
import DateInput from './DateInput';
import CategoryInput from './CategoryInput';
import PaymentInput from './PaymentInput';
import PriceInput from './PriceInput';
import MessageInput from './MessageInput';
import ContentInput from './ContentInput';
import { createTransaction } from '../../../api/transaction';

import './TransactionAddModal.scss';

const TransactionAddModal = ({
  setTransactionAddModal,
  accountbookId,
}: {
  setTransactionAddModal: (value: boolean) => void;
  accountbookId: string;
}) => {
  const {
    categoryPool,
    paymentPool,
    accountbook,
    addTransaction,
  } = useTransactionData(store => ({
    accountbook: store.accountBook,
    categoryPool: store.accountBook.categories,
    paymentPool: store.accountBook.payments,
    addTransaction: store.addTransaction,
  }));

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(today.getDate());
  const [category, setCategory] = useState({});
  const [payment, setPayment] = useState({});
  const [price, setPrice] = useState(0);
  const [content, setContent] = useState('');

  const closeModal = () => {
    setTransactionAddModal(false);
  };

  const onOverLayClicked = (e: Event) => {
    if (e.target === e.currentTarget) setTransactionAddModal(false);
  };

  const onCategoryChange = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    const targetElement = e.target as HTMLInputElement;
    const newCategory = {
      name: targetElement.dataset.name,
      icon: targetElement.dataset.icon,
    };
    setCategory(newCategory);
  };

  const onPaymentChange = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    const targetElement = e.target as HTMLInputElement;
    const newPayment = {
      name: targetElement.dataset.name,
      description: targetElement.dataset.description,
    };
    console.log(newPayment);

    setPayment(newPayment);
  };

  const onPriceChange = (e: Event) => {
    if (e.target) {
      const targetElement = e.target as HTMLInputElement;
      setPrice(+targetElement.value);
    }
  };

  const onContentChange = (e: Event) => {
    if (e.target) {
      const targetElement = e.target as HTMLInputElement;
      setContent(targetElement.value);
    }
  };

  const onSubmitClicked = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = `${year}-${month + 1}-${day}`;
    const newTransaction = {
      date,
      type: '지출',
      category,
      cost: price,
      payment,
      content,
    };

    try {
      const { status, data } = await createTransaction(
        accountbookId,
        newTransaction,
      );
      if (status !== 200) throw new Error();
      addTransaction(data);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="transaction__modal" onClick={onOverLayClicked}>
      <div className="form__container">
        <h2>거래내역 추가</h2>
        <form onSubmit={onSubmitClicked}>
          <DateInput
            {...{ year, month, today, day, setYear, setMonth, setDay }}
          />
          <CategoryInput {...{ categoryPool, category, onCategoryChange }} />
          <PaymentInput {...{ paymentPool, onPaymentChange }} />
          <PriceInput {...{ onPriceChange }} />
          <ContentInput {...{ onContentChange }} />
          <MessageInput />

          <div className="transaction__button__container">
            <button type="submit" className="transaction__submit__button">
              확인
            </button>
            <input
              type="reset"
              className="transaction__cancel__button"
              onClick={closeModal}
              value="취소"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionAddModal;
