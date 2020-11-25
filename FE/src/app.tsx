import React from 'react';
import PaymentProvider from './store/PaymentMethod/paymentMethodContext';
import DateInfoProvider from './store/DateInfo/dateInfoContext';
import './app.scss';

import DefaultTemplate from './pages/DefaultTemplate';
import CalendarPage from './pages/Calendar';
import { BrowserRouter, Route } from 'react-router-dom';

const App = props => {
  return (
    <DateInfoProvider>
      <PaymentProvider>
        <BrowserRouter>
          <Route exact path="/" component={DefaultTemplate} />
          <Route exact path="/calendar" component={CalendarPage} />
        </BrowserRouter>
      </PaymentProvider>
    </DateInfoProvider>
  );
};

export default App;
