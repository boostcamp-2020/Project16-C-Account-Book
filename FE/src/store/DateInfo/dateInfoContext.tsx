import React, { createContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { createStore, TStore } from './dateInfoStore';

export const dateInfoContext = createContext<TStore | null>(null);

export const DateInfoProvider: React.FC = ({ children }) => {
  const store = useLocalStore(createStore);

  return (
    <dateInfoContext.Provider value={store}>
      {children}
    </dateInfoContext.Provider>
  );
};

export default DateInfoProvider;
