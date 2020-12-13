import React, { useMemo, useState } from 'react';
import './index.scss';

import { useHistory } from 'react-router-dom';
import TransactionItem from '../TransactionItem';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import { iTransactionsOfOneDay } from '../../../../types/transaction';
import { updateTransaction as updateTransactionApi } from '../../../../api/transaction';
import cursorInElement from '../../../../util/calculate-cursor';

const TransactionsOfOneDay = ({
  date,
  transactions,
  draggedItem,
  setDraggedItem,
}: iTransactionsOfOneDay) => {
  const [draggedIn, setDraggedIn] = useState(false);
  const accountBookId = useHistory().location.state.id;

  const { getTransactionById, updateTransactionInStore } = useAccountBookData(
    store => ({
      getTransactionById: store.getTransactionById,
      updateTransactionInStore: store.updateTransaction,
    }),
  );

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedIn(() => true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const elementBox = e.currentTarget.getBoundingClientRect();
    const cursor = { clientX: e.clientX, clientY: e.clientY };

    if (!cursorInElement(cursor, elementBox)) {
      setDraggedIn(() => false);
    }
  };

  const updateTransaction = async movedTransaction => {
    const { status } = await updateTransactionApi(
      accountBookId,
      movedTransaction,
    );

    if (status !== 200) return alert('이동에 실패했습니다.');

    updateTransactionInStore(movedTransaction);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const movedTransactionId = e.dataTransfer.getData('transactionId');
    const movedTransaction = getTransactionById(movedTransactionId);
    setDraggedIn(false);
    if (movedTransaction.date === date) return;
    movedTransaction.date = date;
    updateTransaction(movedTransaction);
    console.log('on drop:', movedTransactionId);
  };

  return useMemo(
    () => (
      <div
        className={`transactions__oneday__day${
          draggedIn ? ' transactions__oneday__day__draggedIn' : ''
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <label className="transactions__oneday__daybar">{date}일</label>
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
            />
          ))}
          {draggedIn && draggedItem.date !== date && (
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
    [transactions, draggedIn],
  );
};

export default TransactionsOfOneDay;
