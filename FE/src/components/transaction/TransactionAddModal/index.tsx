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
  const [messageInputVisible, setMessageInputVisible] = useState(false);

  const closeModal = () => {
    setTransactionAddModal(false);
  };

  const onOverLayClicked = (e: Event) => {
    if (e.target === e.currentTarget) setTransactionAddModal(false);
  };

  const onContentChange = (e: Event) => {
    if (e.target) {
      const targetElement = e.target as HTMLInputElement;
      setContent(targetElement.value);
    }
  };

  const onSubmitClicked = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = `${year}-${(month + 1)
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
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
        {messageInputVisible ? (
          <>
            <button type="button" className="message__input__button">
              메세지로 추가
            </button>
            <form onSubmit={onSubmitClicked}>
              <DateInput
                {...{ year, month, today, day, setYear, setMonth, setDay }}
              />
              <CategoryInput {...{ categoryPool, setCategory }} />
              <PaymentInput {...{ paymentPool, setPayment }} />
              <PriceInput {...{ setPrice }} />
              <ContentInput {...{ onContentChange }} />

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
          </>
        ) : (
          <>
            <button type="button" className="message__input__back">
              뒤로가기
            </button>
            <MessageInput />
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionAddModal;
