import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import App from './App';

import { DEFAULT_USER } from "./configs";
import { getUserInfo } from './mappers';
import userData from './user.json';

const userInfo = getUserInfo(userData);

const Root = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/:user_login" render={() => <App user={userInfo} />} />
      <Route exact path="/" render={() => <Redirect to={`${DEFAULT_USER}`} />} />
    </Switch>
  </Router>
);

export default Root;
