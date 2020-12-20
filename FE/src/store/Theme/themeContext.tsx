import React, { createContext } from 'react';
import { useLocalObservable } from 'mobx-react';
import { createStore, TStore } from './themeStore';

export const ThemeContext = createContext<TStore | null>(null);

export const ThemeProvider: React.FC = ({ children }) => {
  const store = useLocalObservable(createStore);

  return (
    <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
