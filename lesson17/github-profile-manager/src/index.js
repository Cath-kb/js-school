import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import App from './App';

import { DEFAULT_USER } from './configs';

import './main.css';

ReactDOM.render((
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/:user_login" component={App} />
      <Route path="/" render={() => <Redirect to={`${DEFAULT_USER}`} />} />
    </Switch>
  </Router>
  ), document.getElementById('root')
);
