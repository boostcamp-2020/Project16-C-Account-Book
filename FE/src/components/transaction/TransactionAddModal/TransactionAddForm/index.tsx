import React, { FormEvent, useState } from 'react';

import DateInput from '../DateInput';
import CategoryInput from '../CategoryInput';
import PaymentInput from '../PaymentInput';
import PriceInput from '../PriceInput';
import ContentInput from '../ContentInput';
import './index.scss';

import { createTransaction } from '../../../../api/transaction';
import { useTransactionData } from '../../../../store/AccountBook/accountBookInfoHook';

const TransactionAddForm = ({
  setMessageInputVisible,
  accountbookId,
  closeModal,
}) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(today.getDate());
  const [category, setCategory] = useState({});
  const [payment, setPayment] = useState({});
  const [price, setPrice] = useState(0);
  const [content, setContent] = useState('');

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
    <div className="transaction__add__form">
      <button
        type="button"
        className="message__input__button"
        onClick={() => setMessageInputVisible(true)}
      >
        메세지로 추가
      </button>
      <form className="form" onSubmit={onSubmitClicked}>
        <DateInput
          {...{ year, month, today, day, setYear, setMonth, setDay }}
        />
        <CategoryInput {...{ categoryPool, setCategory }} />
        <PaymentInput {...{ paymentPool, setPayment }} />
        <PriceInput {...{ setPrice }} />
        <ContentInput {...{ setContent }} />

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
  );
};

export default TransactionAddForm;
