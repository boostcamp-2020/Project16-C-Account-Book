import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { dateInfoContext } from './dateInfoContext';
import { TStore } from './dateInfoStore';

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

export const useRootData = <Selection>(
  dataSelector: (store: TStore) => Selection,
) => useStoreData(dateInfoContext, contextData => contextData!, dataSelector);
