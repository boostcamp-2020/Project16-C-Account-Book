import React, { FormEvent, useEffect, useState } from 'react';

import DateInput from '../DateInput';
import CategoryInput from '../CategoryInput';
import PaymentInput from '../PaymentInput';
import PriceInput from '../PriceInput';
import ContentInput from '../ContentInput';
import './index.scss';

import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';
import { useTransactionData } from '../../../../store/AccountBook/accountBookInfoHook';

const TransactionAddForm = ({ accountbookId }) => {
  const {
    setMessageVisible,
    postTransaction,
    setTransactionAddModalVisible,
  } = useTransactionAddModalData(store => ({
    setMessageVisible: store.setMessageVisible,
    postTransaction: store.postTransaction,
    setTransactionAddModalVisible: store.setTransactionAddModalVisible,
  }));

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
    try {
      const newTransaction = await postTransaction(accountbookId);
      console.log('newTransaction: ', newTransaction);

      addTransaction(newTransaction);
      setTransactionAddModalVisible(false);
    } catch (error) {
      console.error(error);
      alert('거래내역 추가 실패');
    }
  };

  return (
    <div className="transaction__add__form">
      <button
        type="button"
        className="message__input__button"
        onClick={() => setMessageVisible(true)}
      >
        메세지로 추가
      </button>
      <form className="form" onSubmit={onSubmitClicked}>
        <DateInput />
        <CategoryInput {...{ categoryPool }} />
        <PaymentInput {...{ paymentPool }} />
        <PriceInput />
        <ContentInput />

        <div className="transaction__button__container">
          <button type="submit" className="transaction__submit__button">
            확인
          </button>
          <input
            type="reset"
            className="transaction__cancel__button"
            onClick={() => setTransactionAddModalVisible(false)}
            value="취소"
          />
        </div>
      </form>
    </div>
  );
};

export default TransactionAddForm;
