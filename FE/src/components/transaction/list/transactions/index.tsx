/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';

import TransactionsOfOneDay from '../TransactionsOfOneDay';
import { useDateInfoData } from '../../../../store/DateInfo/dateInfoHook';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';

const Transactions = ({
  selectedCategories,
  selectedTypes,
}: {
  selectedCategories: string[];
  selectedTypes: string[];
}) => {
  // axios로 비동기 처리
  const {
    filteredTransactions,
    filterTransaction,
    transactions,
  } = useAccountBookData(store => ({
    transactions: store.accountBook.transactions,
    filteredTransactions: store.filteredTransactions,
    filterTransaction: store.filterTransaction,
  }));

  const { year, month } = useDateInfoData(store => store.nowCalendarInfo);

  useEffect(() => {
    filterTransaction(selectedCategories, year, month + 1, selectedTypes);
  }, [transactions, selectedCategories, year, month, selectedTypes]);

  return (
    <>
      {Object.keys(filteredTransactions)
        .sort()
        .reverse()
        .map(day => (
          <TransactionsOfOneDay
            date={day}
            transactions={filteredTransactions[day]}
            key={day}
          />
        ))}
    </>
  );
};

export default Transactions;
