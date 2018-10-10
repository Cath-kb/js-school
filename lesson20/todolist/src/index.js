import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import ToDoList from './ToDoList';
import AddToDo from './AddToDo';
import { store } from './store';
import { initTodos } from './init';
import { interval } from './interval';
import { compose } from './redux-utils/funcs';

initTodos(store);

const App = () => (
  <div className="container my-5">
    <h1>Todo List</h1>
    <hr/>
    <ToDoList/>
    <AddToDo />
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