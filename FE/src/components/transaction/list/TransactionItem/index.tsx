import React from 'react';

import './index.scss';
import { useHistory } from 'react-router-dom';
import { iTransactionItem } from '../../../../types/transaction';
import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';
import { useTransactionData } from '../../../../store/AccountBook/accountBookInfoHook';
import { deleteTransaction as deleteTransactionApi } from '../../../../api/transaction';

const TransactionItem = ({
  id: transactionId,
  date,
  category,
  content,
  payment,
  cost,
  type,
}: iTransactionItem) => {
  const {
    setTransactionAddModalVisible,
    setInput,
  } = useTransactionAddModalData(store => ({
    setTransactionAddModalVisible: store.setTransactionAddModalVisible,
    setInput: store.setInput,
  }));

  const accountBookId = useHistory().location.state.id;

  const deleteTransactionInStore = useTransactionData(
    store => store.deleteTransaction,
  );

  const onTransactionClicked = () => {
    const dateArr = date.split('-');
    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];
    setInput({
      _id: transactionId,
      category,
      payment,
      cost,
      type,
      year,
      month,
      day,
      content,
    });
    setTransactionAddModalVisible(true);
  };

  const onDeleteButtonClicked = async e => {
    e.stopPropagation();
    try {
      const { status } = await deleteTransactionApi(
        accountBookId,
        transactionId,
      );

      if (status !== 200) throw new Error();
      deleteTransactionInStore(transactionId);
    } catch (error) {
      console.error(error);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div className="transaction__item" onClick={onTransactionClicked}>
      <div className="transaction__item__category">
        <span>{category.name}</span>
      </div>
      <div className="transaction__item__description">{content}</div>
      <div className="transaction__item__payment">{payment.name}</div>
      {type === '지출' ? (
        <span className="transaction__item__cost transaction__item__out">{`-${cost}`}</span>
      ) : (
        <span className="transaction__item__cost transaction__item__in">{`+${cost}`}</span>
      )}
      <button
        type="button"
        className="transaction__item__delete__button"
        onClick={onDeleteButtonClicked}
      >
        삭제
      </button>
    </div>
  );
};

export default TransactionItem;
