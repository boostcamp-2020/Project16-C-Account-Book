import React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { createStore, TStore } from './account-book.store';

export const AccountBookContext = React.createContext<TStore | null>(null);

export const AccountBookProvider: React.FC = ({ children }) => {
  const store = useLocalStore(createStore);

  return (
    <AccountBookContext.Provider value={store}>
      {children}
    </AccountBookContext.Provider>
  );
};

export default AccountBookProvider;
