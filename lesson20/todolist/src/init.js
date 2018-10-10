import { saveTodo } from './ToDoList';
import { compose } from './redux-utils';
import todos from './todos';

export const initTodos = ({ dispatch }) => todos.map(
  compose(dispatch, saveTodo)
);