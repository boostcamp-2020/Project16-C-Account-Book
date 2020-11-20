import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from './components/Login';

const App: React.FC = () => {
  console.log('sss');

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
