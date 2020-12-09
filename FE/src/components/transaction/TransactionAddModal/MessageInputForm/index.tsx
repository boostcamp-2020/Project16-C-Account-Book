import React from 'react';

import MessageInput from '../MessageInput';
import getDataFromSMS from '../../../../service/smsParsing';
import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';

const MessageInputForm = () => {
  const {
    messageVisible,
    input,
    setMessageVisible,
    setMessage,
    setInput,
    message,
  } = useTransactionAddModalData(store => ({
    input: store.input,
    messageVisible: store.messageVisible,
    setMessageVisible: store.setMessageVisible,
    setMessage: store.setMessage,
    setInput: store.setInput,
    message: store.message,
  }));

  const getPaymentByName = useAccountBookData(store => store.getPaymentByName);

  const onParseButtonClicked = () => {
    const parsedData = getDataFromSMS(message);

    const newInputData = {
      type: '지출',
      payment: {},
      cost: 0,
      month: 1,
      day: 1,
    };

    if (parsedData.transactionType !== '승인') return;
    if (parsedData.isDeposit) {
      newInputData.type = '수입';
    }

    newInputData.payment = getPaymentByName(parsedData.cardname);
    newInputData.cost = parsedData.amount;
    if (parsedData.date) {
      const dateArr = parsedData.date.split('/');
      newInputData.month = dateArr[0];
      newInputData.day = dateArr[1];
    }

    setInput({ ...input, ...newInputData });
    setMessageVisible(false);
  };

  return (
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
          <button
            type="button"
            className="transaction__submit__button"
            onClick={onParseButtonClicked}
          >
            메세지로 추가
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
  );
};

export default MessageInputForm;
