import React from 'react';

const ToDoItem = ({ id, name, completed, onClick }) => (
  <li className="list-group-item">
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={`checkbox-${id}`}
        onChange={onClick}
        checked={completed}
      />
      <label className="form-check-label" htmlFor={`checkbox-${id}`}>
        {name}
      </label>
    </div>
  </li>
);

export default ToDoItem;
