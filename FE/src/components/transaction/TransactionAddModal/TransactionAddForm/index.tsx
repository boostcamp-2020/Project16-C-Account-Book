import React, { FormEvent, ReactElement, useRef } from 'react';

import validateForm from '../../../../service/transaction-form-validation';
import DateInput from '../DateInput';
import CategoryInput from '../CategoryInput';
import PaymentInput from '../PaymentInput';
import PriceInput from '../PriceInput';
import ContentInput from '../ContentInput';
import './index.scss';

import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';

const TransactionAddForm = ({
  accountbookId,
}: {
  accountbookId: string;
}): ReactElement => {
  const priceInputElementRef = useRef<HTMLInputElement>(null);
  const {
    input,
    setMessageVisible,
    submitPost,
    submitUpdate,
    setTransactionAddModalVisible,
  } = useTransactionAddModalData(store => ({
    input: store.input,
    setMessageVisible: store.setMessageVisible,
    submitPost: store.submitPost,
    submitUpdate: store.submitUpdate,
    setTransactionAddModalVisible: store.setTransactionAddModalVisible,
  }));

  const {
    categoryPool,
    paymentPool,
    accountbook,
    addTransactionToStore,
    updateTransactionToStore,
  } = useAccountBookData(store => ({
    accountbook: store.accountBook,
    categoryPool: store.accountBook.categories,
    paymentPool: store.accountBook.payments,
    addTransactionToStore: store.addTransaction,
    updateTransactionToStore: store.updateTransaction,
  }));

  const addTransaction = async () => {
    try {
      const newTransaction = await submitPost(accountbookId);

      addTransactionToStore(newTransaction);
      setTransactionAddModalVisible(false);
    } catch (error) {
      alert('거래내역 추가 실패');
    }
  };

  const updateTransaction = async () => {
    try {
      const updatedTransaction = await submitUpdate(accountbookId);
      updateTransactionToStore(updatedTransaction);
      setTransactionAddModalVisible(false);
    } catch (error) {
      alert('거래내역 수정 실패');
    }
  };

  const onSubmitClicked = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (validateForm(input)) {
        if (input._id === '') {
          addTransaction();
        } else {
          updateTransaction();
        }
      }
    } catch (error) {
      if (error.name === 'PRICE_UNSET') {
        priceInputElementRef.current?.focus();
      }

      alert(error.message);
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
        <PriceInput {...{ priceInputElementRef }} />
        <ContentInput />

        <div className="transaction__button__container">
          <button type="submit" className="transaction__submit__button">
            {input._id === '' ? '추가' : '수정'}
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
