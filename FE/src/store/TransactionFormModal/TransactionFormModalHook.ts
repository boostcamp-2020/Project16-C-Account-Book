import React from 'react';
import { useObserver } from 'mobx-react';
import { transactionFormModalContext } from './TransactionFormModalContext';
import { TStore } from './TransactionFormModalStore';

export const useStoreData = <Selection, ContextData, Store>(
  context: React.Context<ContextData>,
  storeSelector: (contextData: ContextData) => Store,
  dataSelector: (store: Store) => Selection,
): any => {
  try {
    const value = React.useContext(context);
    if (!value) throw new Error();
    const store = storeSelector(value);
    return useObserver(() => {
      return dataSelector(store);
    });
  } catch (error) {
    console.error(error);
  }
};

export const useTransactionAddModalData = <Selection>(
  dataSelector: (store: TStore) => Selection,
): any =>
  useStoreData(
    transactionFormModalContext,
    contextData => contextData!,
    dataSelector,
  );
