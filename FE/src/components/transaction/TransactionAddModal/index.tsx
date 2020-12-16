import React, { ReactElement, useState } from 'react';

import { useTransactionAddModalData } from '../../../store/TransactionFormModal/TransactionFormModalHook';
import TransactionAddForm from './TransactionAddForm';
import MessageInputForm from './MessageInputForm';

import './TransactionAddModal.scss';

const TransactionAddModal = ({
  accountbookId,
}: {
  accountbookId: string;
}): ReactElement => {
  const {
    messageVisible,
    setTransactionAddModalVisible,
    initInput,
  } = useTransactionAddModalData(store => ({
    setTransactionAddModalVisible: store.setTransactionAddModalVisible,
    messageVisible: store.messageVisible,
    initInput: store.initInput,
  }));

  const closeModal = () => {
    initInput();
    setTransactionAddModalVisible(false);
  };

  const onOverLayClicked = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
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
