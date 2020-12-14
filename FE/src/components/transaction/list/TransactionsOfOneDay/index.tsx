import React, { useMemo } from 'react';
import './index.scss';

import { useHistory } from 'react-router-dom';
import TransactionItem from '../TransactionItem';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import { iTransactionsOfOneDay } from '../../../../types/transaction';
import { updateTransaction as updateTransactionApi } from '../../../../api/transaction';
import { useThemeData } from '../../../../store/Theme/themeHook';

const TransactionsOfOneDay = ({
  date,
  transactions,
  draggedItem,
  setDraggedItem,
  draggedInDate,
  setDraggedInDate,
}: iTransactionsOfOneDay) => {
  const accountBookId = useHistory().location.state.id;
  const theme = useThemeData(store => store.mode);

  const { getTransactionById, updateTransactionInStore } = useAccountBookData(
    store => ({
      getTransactionById: store.getTransactionById,
      updateTransactionInStore: store.updateTransaction,
    }),
  );

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedInDate(date);
  };

  const updateTransaction = async movedTransaction => {
    const { status } = await updateTransactionApi(
      accountBookId,
      movedTransaction,
    );

    if (status !== 200) return alert('이동에 실패했습니다.');

    updateTransactionInStore(movedTransaction);
    setDraggedInDate('');
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const movedTransactionId = e.dataTransfer.getData('transactionId');
    const movedTransaction = getTransactionById(movedTransactionId);

    if (draggedItem.date === date) return setDraggedInDate('');
    movedTransaction.date = date;
    updateTransaction(movedTransaction);
  };

  return useMemo(
    () => (
      <div
        className={`transactions__oneday__day${
          draggedInDate === date ? ' transactions__oneday__day__draggedIn' : ''
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <label
          className={
            theme === 'dark'
              ? 'transactions__oneday__daybar'
              : 'transactions__oneday__daybar light'
          }
        >
          {date}일
        </label>
        <ul className="transactions__oneday__container">
          {transactions.map(t => (
            <TransactionItem
              dragObject={false}
              date={date}
              category={t.category}
              content={t.content}
              payment={t.payment}
              cost={t.cost}
              type={t.type}
              id={t._id}
              key={t._id}
              setDraggedItem={setDraggedItem}
              setDraggedInDate={setDraggedInDate}
            />
          ))}
          {draggedInDate === date && draggedItem?.date !== date && (
            <TransactionItem
              dragObject
              date={date}
              category={draggedItem.category}
              content={draggedItem.content}
              payment={draggedItem.payment}
              cost={draggedItem.cost}
              type={draggedItem.type}
              id={draggedItem._id}
            />
          )}
        </ul>
      </div>
    ),
    [transactions, draggedInDate],
  );
};

export default TransactionsOfOneDay;
