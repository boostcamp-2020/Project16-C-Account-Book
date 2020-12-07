import React, { useState } from 'react';

import { useTransactionAddModalData } from '../../../store/TransactionFormModal/TransactionFormModalHook';
import TransactionAddForm from './TransactionAddForm';
import MessageInput from './MessageInput';

import './TransactionAddModal.scss';

const TransactionAddModal = ({ accountbookId }: { accountbookId: string }) => {
  const {
    messageVisible,
    setTransactionAddModalVisible,
    setMessageVisible,
    setMessage,
    initInput,
  } = useTransactionAddModalData(store => ({
    setTransactionAddModalVisible: store.setTransactionAddModalVisible,
    messageVisible: store.messageVisible,
    setMessageVisible: store.setMessageVisible,
    setMessage: store.setMessage,
    initInput: store.initInput,
  }));

  const closeModal = () => {
    initInput();
    setTransactionAddModalVisible(false);
  };

  const onOverLayClicked = (e: Event) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className="transaction__modal" onClick={onOverLayClicked}>
      <div className="form__container">
        <h2>거래내역 추가</h2>
        {!messageVisible ? (
          <TransactionAddForm accountbookId={accountbookId} />
        ) : (
          <>
            <button
              type="button"
              className="message__input__back"
              onClick={() => setMessageVisible(false)}
            >
              뒤로가기
            </button>
            <div className="form">
              <MessageInput />
              <div className="transaction__button__container">
                <button type="button" className="transaction__submit__button">
                  확인
                </button>
                <button
                  type="button"
                  className="transaction__cancel__button"
                  onClick={() => setMessage('')}
                >
                  지우기
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionAddModal;
