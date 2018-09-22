import React from 'react';

import { getObjDiff, hasObjDiff } from '../../utils/common';

import Avatar from './Avatar';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: this.props.initialUser.person,
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const patch = getObjDiff(this.props.initialUser.person, this.state.person);
    this.props.onSubmit(patch);
  };

  isDirty = () => {
    return hasObjDiff(this.props.initialUser.person, this.state.person);
  };

  updateValue = name => event => {
    this.setState({
      person: {
        ...this.state.person,
        [name]: event.target.value,
      },
    });
  };

  render() {
    const { onReset } = this.props;
    const {avatar, person: user } = this.props.initialUser;
    const { person } = this.state;

    return (
      <div className="row">
        <div className="col-md-4 text-center text-md-left mb-4">
          <Avatar avatar={avatar} />
          <h2>{user.login}</h2>
        </div>
        <div className="col-md-8">
          <form>
            <div className="form-group">
              <label htmlFor="name">User Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="User Name"
                value={person.name}
                onChange={this.updateValue('name')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                className="form-control"
                id="company"
                placeholder="Company"
                value={person.company}
                onChange={this.updateValue('company')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="Location"
                value={person.location}
                onChange={this.updateValue('location')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                className="form-control"
                id="bio"
                placeholder="Bio"
                rows="3"
                value={person.bio}
                onChange={this.updateValue('bio')}
              />
            </div>
            <div className="form-group d-flex justify-content-between">
              <button type="reset" className="btn btn-secondary" onClick={onReset}>Cancel</button>
              <button type="submit" className="btn btn-primary" onClick={this.onSubmit} disabled={!this.isDirty()}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
