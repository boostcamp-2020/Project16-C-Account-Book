import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PaymentProvider from './store/PaymentMethod/paymentMethodContext';
import './app.scss';
import PaymentMethod from './pages/PaymentMethod';
import LoginPage from './components/Login';

const App = () => {
  return (
    <PaymentProvider>
      <Router>
        <Switch>

            <Route path="/login" component={LoginPage} />
            <Route path="/paymentmethod" component={PaymentMethod} />
        </Switch>
      </Router>
    </PaymentProvider>  
  );
};

export default App;
