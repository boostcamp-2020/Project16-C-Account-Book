import React, { useState } from 'react';

import './index.scss';
import { useHistory } from 'react-router-dom';
import { iTransactionItem } from '../../../../types/transaction';
import { useTransactionAddModalData } from '../../../../store/TransactionFormModal/TransactionFormModalHook';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import { deleteTransaction as deleteTransactionApi } from '../../../../api/transaction';
import { useThemeData } from '../../../../store/Theme/themeHook';

const TransactionItem = ({
  id: transactionId,
  date,
  category,
  content,
  payment,
  cost,
  type,
  setDraggedItem,
  dragObject,
  setDraggedInDate,
}: iTransactionItem) => {
  const theme = useThemeData(store => store.mode);
  const [buttonReveal, setButtonReveal] = useState('');

  const {
    setTransactionAddModalVisible,
    setInput,
  } = useTransactionAddModalData(store => ({
    setTransactionAddModalVisible: store.setTransactionAddModalVisible,
    setInput: store.setInput,
  }));

  const accountBookId = useHistory().location.state.id;

  const { deleteTransactionInStore, getTransactionById } = useAccountBookData(
    store => ({
      deleteTransactionInStore: store.deleteTransaction,
      getTransactionById: store.getTransactionById,
    }),
  );

  const onTransactionClicked = () => {
    if (buttonReveal === 'reveal') setButtonReveal('hide');
    else setButtonReveal('reveal');
  };

  const onModifyButtonClicked = () => {
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

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.target.classList.add('on__drag');

    e.dataTransfer.setData('transactionId', transactionId);
    const movedTransaction = getTransactionById(transactionId);

    setDraggedItem(movedTransaction);
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.target.classList.remove('on__drag');
    console.log('on end', e.dataTransfer.dropEffect);
    setTimeout(() => {
      setDraggedInDate('');
    }, 50);
  };

  return (
    <div
      className={`transaction__item${dragObject ? ' on__dragged__in' : ''}`}
      onClick={onTransactionClicked}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div
        className={
          theme === 'dark'
            ? 'transaction__item__category'
            : 'transaction__item__category light'
        }
      >
        <span>{category.name}</span>
      </div>
      <div
        className={
          theme === 'dark'
            ? 'transaction__item__description'
            : 'transaction__item__description light'
        }
      >
        {content}
      </div>
      <div
        className={
          theme === 'dark'
            ? 'transaction__item__payment'
            : 'transaction__item__payment light'
        }
      >
        {payment.name}
      </div>
      {type === '지출' ? (
        <span className="transaction__item__cost transaction__item__out">{`-${cost}`}</span>
      ) : (
        <span className="transaction__item__cost transaction__item__in">{`+${cost}`}</span>
      )}
      <div className={`transaction__item__button__container ${buttonReveal}`}>
        <button
          type="button"
          className="transaction__item__modify__button"
          onClick={onModifyButtonClicked}
        >
          수정
        </button>
        <button
          type="button"
          className="transaction__item__delete__button"
          onClick={onDeleteButtonClicked}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
