import React, { useState } from 'react';

import { useTransactionAddModalData } from '../../../store/TransactionFormModal/TransactionFormModalHook';
import TransactionAddForm from './TransactionAddForm';
import MessageInputForm from './MessageInputForm';

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
          <MessageInputForm />
        )}
      </div>
    </div>
  );
};

export default TransactionAddModal;
