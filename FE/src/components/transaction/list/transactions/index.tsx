/* eslint-disable react/jsx-one-expression-per-line */
import React, { ReactElement, useEffect, useState } from 'react';

import { initialTransaction, iTransaction } from '@interfaces/transaction';
import TransactionsOfOneDay from '../TransactionsOfOneDay';
import { useDateInfoData } from '../../../../store/DateInfo/dateInfoHook';
import { useAccountBookData } from '../../../../store/AccountBook/accountBookInfoHook';

const Transactions = ({
  selectedCategories,
  selectedTypes,
}: {
  selectedCategories: string[];
  selectedTypes: string[];
}): ReactElement => {
  const [draggedItem, setDraggedItem] = useState<iTransaction>(
    initialTransaction,
  );
  const [draggedInDate, setDraggedInDate] = useState<string>('');

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
