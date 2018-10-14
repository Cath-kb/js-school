import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';
import { store }  from './store';
import { DEFAULT_USER } from "./configs";

ReactDOM.render(
  <Root store={store} defaultUser={DEFAULT_USER} />,
  document.getElementById('root')
);
