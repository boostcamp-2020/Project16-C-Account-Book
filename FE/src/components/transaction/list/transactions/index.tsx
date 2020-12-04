/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';

import TransactionsOfOneDay from '../TransactionsOfOneDay';
import { useRootData } from '../../../../store/DateInfo/dateInfoHook';
import { useTransactionData } from '../../../../store/AccountBook/accountBookInfoHook';

const Transactions = ({
  selectedCategory,
  selectedTypes,
}: {
  selectedCategory: string;
  selectedTypes: string[];
}) => {
  // axios로 비동기 처리
  const { transactions, filterTransaction } = useTransactionData(store => ({
    transactions: store.filteredTransactions,
    filterTransaction: store.filterTransaction,
  }));

  const { year, month } = useRootData(store => store.nowCalendarInfo);

  useEffect(() => {
    filterTransaction(selectedCategory, year, month + 1, selectedTypes);
  }, [selectedCategory, year, month, selectedTypes]);

  return (
    <>
      {Object.keys(transactions)
        .sort()
        .reverse()
        .map(day => (
          <TransactionsOfOneDay date={day} transactions={transactions[day]} />
        ))}
    </>
  );
};

export default Transactions;
