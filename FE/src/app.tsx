import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PaymentProvider from './store/PaymentMethod/paymentMethodContext';
import DateInfoProvider from './store/DateInfo/dateInfoContext';
import './app.scss';

import DefaultTemplate from './pages/DefaultTemplate';
import CalendarPage from './pages/Calendar';
import LoginPage from './pages/Login';
import TransactionPage from './pages/transaction';
import GithubLoginProcess from './pages/Login/GithubLoginProcess';

const App = () => {
  return (
    <DateInfoProvider>
      <PaymentProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={DefaultTemplate} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/auth/github" component={GithubLoginProcess} />
            <Route exact path="/calendar" component={CalendarPage} />
            <Route exact path="/transaction" component={TransactionPage} />
          </Switch>
        </Router>
      </PaymentProvider>
    </DateInfoProvider>
  );
};

export default App;
