import React, { ReactElement, useMemo } from 'react';
import './index.scss';

import { useHistory } from 'react-router-dom';
import { iTransactionOfOneDayProp } from '@interfaces/transaction-components';
import { iLocation } from '@interfaces/accountbook';
import { iTransaction } from '@interfaces/transaction';
import TransactionItem from '../TransactionItem';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';
import { updateTransaction as updateTransactionApi } from '../../../../api/transaction';
import { useThemeData } from '../../../../store/Theme/themeHook';

const TransactionsOfOneDay = ({
  date,
  transactions,
  draggedItem,
  setDraggedItem,
  draggedInDate,
  setDraggedInDate,
}: iTransactionOfOneDayProp): ReactElement => {
  const { location } = useHistory<iLocation>();
  const accountBookId = location.state.id;
  const theme = useThemeData(store => store.mode);

  const { getTransactionById, updateTransactionInStore } = useAccountBookData(
    store => ({
      getTransactionById: store.getTransactionById,
      updateTransactionInStore: store.updateTransactionToLast,
    }),
  );

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedInDate(date);
  };

  const updateTransaction = async (
    movedTransaction: iTransaction,
  ): Promise<void> => {
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
    if (movedTransaction) {
      movedTransaction.date = date;
      updateTransaction(movedTransaction);
    }
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
              _id={t._id}
              key={t._id}
              setDraggedItem={setDraggedItem}
              setDraggedInDate={setDraggedInDate}
            />
          ))}
          {draggedInDate === date && draggedItem?.date !== date && (
            <TransactionItem
              dragObject
              date={date}
              category={draggedItem?.category}
              content={draggedItem?.content}
              payment={draggedItem.payment}
              cost={draggedItem.cost}
              type={draggedItem.type}
              _id={draggedItem._id}
            />
          )}
        </ul>
      </div>
    ),
    [transactions, draggedInDate, theme],
  );
};

export default TransactionsOfOneDay;
