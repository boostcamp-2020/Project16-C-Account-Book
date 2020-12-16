import React, { createContext } from 'react';
import { useLocalObservable } from 'mobx-react';
import { createStore, TStore } from './dateInfoStore';

export const dateInfoContext = createContext<TStore | null>(null);

export const DateInfoProvider: React.FC = ({ children }) => {
  const store = useLocalObservable(createStore);

  return (
    <dateInfoContext.Provider value={store}>
      {children}
    </dateInfoContext.Provider>
  );
};

export default DateInfoProvider;
