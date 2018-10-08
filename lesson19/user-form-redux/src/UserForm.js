import React from 'react';

const UserForm = ({ name, age, isStudent, onNameChanged, onAgeChanged, onIsStudentChanged }) => (
  <form>
    <div className="form-group row">
      <label className="col-sm-2 col-form-label" htmlFor="name">User Name</label>
      <div className="col-sm-4">
        <input
          id="name"
          type="text"
          className="form-control"
          value={name}
          onChange={onNameChanged}
        />
      </div>
    </div>
    <div className="form-group row">
      <label className="col-sm-2 col-form-label" htmlFor="age">User Name</label>
      <div className="col-sm-3">
        <input
          id="age"
          type="number"
          className="form-control"
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
            value={isStudent}
            onChange={onIsStudentChanged}
          />
          <label htmlFor="is-student" className="form-check-label">Student</label>
        </div>
      </div>
    </div>
  </form>
);

export default UserForm;