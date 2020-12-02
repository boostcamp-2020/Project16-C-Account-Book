import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PaymentProvider from './store/PaymentMethod/paymentMethodContext';
import DateInfoProvider from './store/DateInfo/dateInfoContext';
import TransactionInfoProvider from './store/TransactionData/transactionDataContext';
import './app.scss';

import DefaultTemplate from './pages/DefaultTemplate';
import CalendarPage from './pages/Calendar';
import LoginPage from './pages/Login';
import TransactionPage from './pages/transaction';
import GithubLoginProcess from './pages/Login/GithubLoginProcess';
import ChartPage from './pages/Chart';

const App = () => {
  return (
    <DateInfoProvider>
      <TransactionInfoProvider>
        <PaymentProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={DefaultTemplate} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/auth/github" component={GithubLoginProcess} />
              <Route exact path="/calendar" component={CalendarPage} />
              <Route exact path="/transaction" component={TransactionPage} />
              <Route exact path="/chart" component={ChartPage} />
            </Switch>
          </Router>
        </PaymentProvider>
      </TransactionInfoProvider>
    </DateInfoProvider>
  );
};

export default App;
