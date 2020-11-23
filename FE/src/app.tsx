import React from 'react';
import PaymentProvider from './store/PaymentMethod/paymentMethodContext';
import './app.scss';

import PaymentMethod from './pages/PaymentMethod';

const App = props => {
  return (
    <PaymentProvider>
      <PaymentMethod />
    </PaymentProvider>
  );
};

export default App;
