import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { getUserInfoList } from './mappers';
import registerServiceWorker from './registerServiceWorker';

import usersData from './users.json';
const userList = getUserInfoList(usersData);

ReactDOM.render(<App users={userList} />, document.getElementById('root'));
registerServiceWorker();
