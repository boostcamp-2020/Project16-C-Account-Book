import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PaymentProvider from './store/PaymentMethod/paymentMethodContext';
import DateInfoProvider from './store/DateInfo/dateInfoContext';
import TransactionInfoProvider from './store/TransactionData/transactionDataContext';
import AccountBookProvider from './store/AccountBook/account-book.context';

import './app.scss';

import AccountBookListPage from './pages/AccountBook';
import CalendarPage from './pages/Calendar';
import LoginPage from './pages/Login';
import TransactionPage from './pages/transaction';

import GithubLoginProcess from './pages/Login/GithubLoginProcess';
import NaverLoginProcess from './pages/Login/NaverLoginProcess';
import ChartPage from './pages/Chart';

import GithubLoginProcess from './pages/Login/GithubLoginProcess';

const App = () => {
  return (  
    <DateInfoProvider>
      <TransactionInfoProvider>
        <AccountBookProvider>  
          <PaymentProvider>
            <Router>
              <Switch>
                <Route exact path="/" component={AccountBookListPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/auth/github" component={GithubLoginProcess} />
                <Route exact path="/auth/naver" component={NaverLoginProcess} />
                <Route exact path="/calendar" component={CalendarPage} />
                <Route exact path="/transaction" component={TransactionPage} />
                <Route exact path="/chart" component={ChartPage} />
              </Switch>
            </Router>
          </PaymentProvider>
        </AccountBookProvider>
      </TransactionInfoProvider>
    </DateInfoProvider>
  );
};

export default App;
