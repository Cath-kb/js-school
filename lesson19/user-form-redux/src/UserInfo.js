import React from 'react';
import { connect } from 'react-redux';

const UserInfo = ({ name, age, isStudent }) => (
  <div className="row">
    <div className="col-sm-6">
      <samp className="form-control" readOnly={true}>
        {isStudent ? 'Student ' : ''}
        {name || '"Mr. X"'}
        {age !== '' ? ` is ${age} years old.` : ' has no age.'}
      </samp>
    </div>
  </div>
);
const mapStateToProps = state => state;

export default connect(mapStateToProps)(UserInfo);
