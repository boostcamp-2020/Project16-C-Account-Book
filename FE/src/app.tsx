import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PaymentProvider from './store/PaymentMethod/paymentMethodContext';
import DateInfoProvider from './store/DateInfo/dateInfoContext';
import './app.scss';

import DefaultTemplate from './pages/DefaultTemplate';
import CalendarPage from './pages/Calendar';
import LoginPage from './components/Login';

const App = () => {
    
  return (
    <DateInfoProvider>
      <PaymentProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={DefaultTemplate} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/calendar" component={CalendarPage} />
          </Switch>
        </Router>
      </PaymentProvider>
    </DateInfoProvider>
  );
};

export default App;
