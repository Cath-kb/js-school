import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { getUserInfo } from './mappers';

import userData from './user.json';
const userInfo = getUserInfo(userData);

ReactDOM.render(
  <App user={userInfo} />,
  document.getElementById('root')
);
registerServiceWorker();
