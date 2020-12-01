import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PaymentProvider from './store/PaymentMethod/paymentMethodContext';
import DateInfoProvider from './store/DateInfo/dateInfoContext';
import './app.scss';
import AccountBookListPage from './pages/AccountBook';
import CalendarPage from './pages/Calendar';
import LoginPage from './pages/Login';
import TransactionPage from './pages/transaction';
import GithubLoginProcess from './pages/Login/GithubLoginProcess';
import AccountBookProvider from './store/AccountBook/account-book.context';

const App = () => {
  return (
    <DateInfoProvider>
      <PaymentProvider>
        <AccountBookProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={AccountBookListPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/auth/github" component={GithubLoginProcess} />
              <Route exact path="/calendar" component={CalendarPage} />
              <Route exact path="/transaction" component={TransactionPage} />
            </Switch>
          </Router>
        </AccountBookProvider>
      </PaymentProvider>
    </DateInfoProvider>
  );
};

export default App;
