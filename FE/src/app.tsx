import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PaymentProvider from './store/PaymentMethod/paymentMethodContext';
import DateInfoProvider from './store/DateInfo/dateInfoContext';
import TransactionInfoProvider from './store/TransactionData/transactionDataContext';

import './app.scss';

import AccountBookListPage from './pages/AccountBook';
import CalendarPage from './pages/Calendar';
import LoginPage from './pages/Login';
import TransactionPage from './pages/Transaction';

import GithubLoginProcess from './pages/Login/GithubLoginProcess';
import NaverLoginProcess from './pages/Login/NaverLoginProcess';
import ChartPage from './pages/Chart';

const App = () => {
  return (
    <DateInfoProvider>
      <TransactionInfoProvider>
        <PaymentProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={AccountBookListPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/auth/github" component={GithubLoginProcess} />
              <Route exact path="/auth/naver" component={NaverLoginProcess} />
              <Route exact path="/calendar">
                <CalendarPage />
              </Route>
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
