import React, { createContext } from 'react';
import { useLocalObservable } from 'mobx-react';
import { createStore, TStore } from './paymentMethodStore';

export const paymentContext = createContext<TStore | null>(null);

export const PaymentProvider: React.FC = ({ children }) => {
  const store = useLocalObservable(createStore);

  return (
    <paymentContext.Provider value={store}>{children}</paymentContext.Provider>
  );
};

export default PaymentProvider;
