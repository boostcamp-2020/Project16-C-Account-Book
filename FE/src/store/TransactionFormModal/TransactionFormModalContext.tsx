import React, { createContext } from 'react';
import { useLocalObservable } from 'mobx-react';
import { createStore, TStore } from './TransactionFormModalStore';

export const transactionFormModalContext = createContext<TStore | null>(null);

export const TransactionFormModalProvider: React.FC = ({ children }) => {
  const store = useLocalObservable(createStore);

  return (
    <transactionFormModalContext.Provider value={store}>
      {children}
    </transactionFormModalContext.Provider>
  );
};

export default TransactionFormModalProvider;
