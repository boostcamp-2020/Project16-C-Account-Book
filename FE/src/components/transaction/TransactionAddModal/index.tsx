import React, { useState } from 'react';

import TransactionAddForm from './TransactionAddForm';
import MessageInput from './MessageInput';

import './TransactionAddModal.scss';

const TransactionAddModal = ({
  setTransactionAddModal,
  accountbookId,
}: {
  setTransactionAddModal: (value: boolean) => void;
  accountbookId: string;
}) => {
  const [message, setMessage] = useState('');
  const [messageInputVisible, setMessageInputVisible] = useState(false);

  const closeModal = () => {
    setTransactionAddModal(false);
  };

  const onOverLayClicked = (e: Event) => {
    if (e.target === e.currentTarget) setTransactionAddModal(false);
  };

  return (
    <div className="transaction__modal" onClick={onOverLayClicked}>
      <div className="form__container">
        <h2>거래내역 추가</h2>
        {!messageInputVisible ? (
          <TransactionAddForm
            {...{
              setMessageInputVisible,
              accountbookId,
              closeModal,
            }}
          />
        ) : (
          <>
            <button
              type="button"
              className="message__input__back"
              onClick={() => setMessageInputVisible(false)}
            >
              뒤로가기
            </button>
            <div className="form">
              <MessageInput {...{ message, setMessage }} />
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
