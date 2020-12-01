/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import TransactionsOfOneDay from '../TransactionsOfOneDay';
import { useTransactionData } from '../../../../store/TransactionData/transactionInfoHook';

const Transactions = () => {
  // axios로 비동기 처리
  const transactions = useTransactionData(
    store => store.accountBook.transaction,
  );

  const days = transactions.map(value => value.date);
  const daysArr = Array.from(new Set<string>(days)).reverse();

  return (
    <>
      {daysArr.map(day => (
        <TransactionsOfOneDay date={day} transactions={transactions} />
      ))}
    </>
  );
};

export default Transactions;
