import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import ToDoList from './ToDoList'
import { store } from './store';
import { initTodos } from './init';
import { interval } from './interval';
import { compose } from './redux-utils/funcs';

initTodos(store);

const App = () => (
  <div className="container">
    <div className="row">
      <h1>Todo List</h1>
    </div>
    <hr/>
    <ToDoList />
  </div>
);

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  rootElement
);

setInterval(
  compose(store.dispatch, interval),
  1000
)