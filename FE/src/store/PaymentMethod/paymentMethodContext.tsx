import React, { createContext } from 'react';
import { useLocalStore } from 'mobx-react';
import { createStore, TStore } from './paymentMethodStore';

export const paymentContext = createContext<TStore | null>(null);

export const PaymentProvider: React.FC = ({ children }) => {
  const store = useLocalStore(createStore);

  return (
    <paymentContext.Provider value={store}>{children}</paymentContext.Provider>
  );
};

export default PaymentProvider;
