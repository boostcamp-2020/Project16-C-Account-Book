import React from 'react';
import { useObserver } from 'mobx-react';
import { transactionInfoContext } from './transactionDataContext';
import { TStore } from './transactionData';

export const useStoreData = <Selection, ContextData, Store>(
  context: React.Context<ContextData>,
  storeSelector: (ContextData: ContextData) => Store,
  dataSelector: (store: Store) => Selection,
) => {
  const value = React.useContext(context);
  if (!value) throw new Error();

  const store = storeSelector(value);
  return useObserver(() => {
    return dataSelector(store);
  });
};

export const useTransactionData = <Selection>(
  dataSelector: (store: TStore) => Selection,
) =>
  useStoreData(
    transactionInfoContext,
    contextData => contextData!,
    dataSelector,
  );
