/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';

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
  const [draggedItem, setDraggedItem] = useState({});
  const [draggedInDate, setDraggedInDate] = useState('');

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
            draggedItem={draggedItem}
            setDraggedItem={setDraggedItem}
            draggedInDate={draggedInDate}
            setDraggedInDate={setDraggedInDate}
          />
        ))}
    </>
  );
};

export default Transactions;
