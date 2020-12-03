import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { AccountBookContext } from './account-book.context';
import { TStore } from './account-book.store';

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

export const useAccountBookData = <Selection>(
  dataSelector: (store: TStore) => Selection,
) =>
  useStoreData(AccountBookContext, contextData => contextData!, dataSelector);
