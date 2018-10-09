import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import App from './App';

// Add ReactRedux.Provider here
const appWithStore = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(appWithStore, document.getElementById('root'));
