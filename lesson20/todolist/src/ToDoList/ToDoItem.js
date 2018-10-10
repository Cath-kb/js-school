import React from 'react';

const ToDoItem = ({ id, name, completed, deleted, onClick, onDelete, onRestore }) => {
  const btnProps = {
    className: 'btn-danger',
    title: 'remove',
    text: '\u274c',
    onClick: onDelete
  };

  if (deleted) {
    btnProps.className = 'btn-light';
    btnProps.title = 'undo';
    btnProps.text = '\u21b6';
    btnProps.onClick = onRestore;
  }

  return (
  <li className="list-group-item">
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input mt-2"
        id={`checkbox-${id}`}
        onChange={onClick}
        checked={completed}
        disabled={deleted}
      />
      <label className="form-check-label" htmlFor={`checkbox-${id}`}>
        {deleted ? <del>{name}</del> : name}
      </label>
      <button
        type="button"
        className={`${btnProps.className} ml-3 btn btn-sm font-weight-bold`}
        title={btnProps.title}
        onClick={btnProps.onClick}
      >
        {btnProps.text}
      </button>
    </div>
  </li>
)};

export default ToDoItem;
