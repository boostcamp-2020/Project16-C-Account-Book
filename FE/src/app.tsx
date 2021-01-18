import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PaymentProvider from './store/PaymentMethod/paymentMethodContext';
import DateInfoProvider from './store/DateInfo/dateInfoContext';
import TransactionInfoProvider from './store/AccountBook/accountBookDataContext';
import ThemeProvider from './store/Theme/themeContext';
import './app.scss';

import GithubLoginProcess from './pages/Login/GithubLoginProcess';
import NaverLoginProcess from './pages/Login/NaverLoginProcess';

const LoginPage = lazy(() => import('./pages/Login'));
const CalendarPage = lazy(() => import('./pages/Calendar'));
const AccountBookListPage = lazy(() => import('./pages/AccountBook'));
const TransactionPage = lazy(() => import('./pages/Transaction'));
const ChartPage = lazy(() => import('./pages/Chart'));
const SettingPage = lazy(() => import('./pages/SettingPage'));

const App = () => {
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
  }

  return (
    <ThemeProvider>
      <DateInfoProvider>
        <TransactionInfoProvider>
          <PaymentProvider>
            <Router>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path="/" component={AccountBookListPage} exact />
                  <Route path="/login" component={LoginPage} exact />
                  <Route
                    path="/auth/github"
                    component={GithubLoginProcess}
                    exact
                  />
                  <Route
                    path="/auth/naver"
                    component={NaverLoginProcess}
                    exact
                  />
                  <Route path="/calendar" exact>
                    <CalendarPage />
                  </Route>
                  <Route
                    exact
                    path="/transaction"
                    component={TransactionPage}
                  />
                  <Route path="/chart" component={ChartPage} exact />
                  <Route path="/setting" component={SettingPage} exact />
                </Switch>
              </Suspense>
            </Router>
          </PaymentProvider>
        </TransactionInfoProvider>
      </DateInfoProvider>
    </ThemeProvider>
  );
};

export default App;
