import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';

const Root = ({ store, defaultUser }) => (
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/:user_login" component={App} />
        <Route path="/" render={() => <Redirect to={`/${defaultUser}`} />} />
      </Switch>
    </Router>
  </Provider>
);

export default Root;
