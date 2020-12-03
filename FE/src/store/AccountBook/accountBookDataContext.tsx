import React, { createContext } from 'react';
import { useLocalObservable } from 'mobx-react';
import { createStore, TStore } from './accountBookData';

export const transactionInfoContext = createContext<TStore | null>(null);

export const TransactionInfoProvider: React.FC = ({ children }) => {
  const store = useLocalObservable(createStore);

  return (
    <transactionInfoContext.Provider value={store}>
      {children}
    </transactionInfoContext.Provider>
  );
};

export default TransactionInfoProvider;
