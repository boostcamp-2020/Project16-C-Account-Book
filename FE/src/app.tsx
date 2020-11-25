import React from 'react';
import PaymentProvider from './store/PaymentMethod/paymentMethodContext';
import DateInfoProvider from './store/DateInfo/dateInfoContext';
import './app.scss';

import PaymentMethod from './pages/defaultTemplate';
import CalendarPage from './pages/Calendar';
import { BrowserRouter, Route } from 'react-router-dom';

const App = props => {
  return (
    <DateInfoProvider>
      <PaymentProvider>
        <BrowserRouter>
          <Route path="/" component={PaymentMethod} />
          <Route path="/calendar" component={CalendarPage} />
        </BrowserRouter>
      </PaymentProvider>
    </DateInfoProvider>
  );
};

export default App;
