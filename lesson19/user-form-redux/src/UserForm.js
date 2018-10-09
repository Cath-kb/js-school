import React from 'react';
import { connect } from 'react-redux';

import {actions} from './store';

const UserForm = ({ name, age, isStudent, onNameChanged, onAgeChanged, onIsStudentChanged }) => (
  <form>
    <div className="form-group row">
      <label className="col-sm-2 col-form-label" htmlFor="name">User Name</label>
      <div className="col-sm-4">
        <input
          id="name"
          type="text"
          placeholder="User Name"
          className="form-control"
          value={name}
          onChange={onNameChanged}
        />
      </div>
    </div>
    <div className="form-group row">
      <label className="col-sm-2 col-form-label" htmlFor="age">User Age</label>
      <div className="col-sm-2">
        <input
          id="age"
          type="number"
          className="form-control"
          min="0"
          max="255"
          value={age}
          onChange={onAgeChanged}
        />
      </div>
    </div>
    <div className="form-group row">
      <div className="col-sm-2 col-form-label">&nbsp;</div>
      <div className="col-sm-3">
        <div className="form-check">
          <input
            id="is-student"
            type="checkbox"
            className="form-check-input"
            checked={isStudent}
            onChange={onIsStudentChanged}
          />
          <label htmlFor="is-student" className="form-check-label">Student</label>
        </div>
      </div>
    </div>
  </form>
);

const mapStateToProps = state => state;

const handlers = {
    onNameChanged: ({ target }) => actions.setName(target.value),
    onAgeChanged: ({ target }) => actions.setAge(target.value),
    onIsStudentChanged: () => actions.toggleIsStudent(),
};

export default connect(mapStateToProps, handlers)(UserForm);
