import React from 'react';
import PaymentProvider from './store/PaymentMethod/paymentMethodContext';
import './app.scss';

import PaymentMethod from './pages/PaymentMethod';
import AccountBook from './pages/AccountBook';

const App = props => {
  return (
    <>
      <AccountBook />
    </>
  );
};

export default App;
