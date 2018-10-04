import React from 'react';

import PersonInfo from "./Person";

import { updateGithubUser } from '../model/api';
import { hasObjDiff, getObjDiff } from "../utils/common";

class EditForm extends React.Component {
  state = {
    person: this.props.initialUser.person,
    token: '',
    isLoading: false,
  };

  goHome = () => {
    const { user_login } = this.props.match.params;
    this.props.history.push(`/${user_login}`);
  };

  submit = (e) => {
    e.preventDefault();
    const { token } = this.state;
    const { user_login } = this.props.match.params;

    const patch = getObjDiff(this.props.initialUser.person, this.state.person);

    this.setState({
      isLoading: true,
    });

    updateGithubUser(user_login, token, patch)
      .then(this.onSuccess)
      .catch(this.showError);
  };

  onSuccess = data => {
    this.props.onSuccess(data);
    this.setState({
      isLoading: false,
      person: this.props.initialUser.person,
    });

    const leavePage = window.confirm('Data was saved! \n\nLeave the Edit page and Go to Main Profile?');
    if (leavePage) {
      this.goHome();
    }
  };

  showError = (e) => {
    this.setState({
      isLoading: false,
    });
    alert(e.message);
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
    })
  };

  updateToken = event => {
    this.setState({
      token: event.target.value,
    })
  };

  render() {
    const { person: currentPerson } = this.props.initialUser;
    const { person, token, isLoading } = this.state;

    const canSubmit = this.isDirty() && token && !isLoading;

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <PersonInfo person={currentPerson} />
            <form autoComplete="off">
              <div className="form-group">
                <label htmlFor="token">Access Token</label>
                <input
                  type="password"
                  className="form-control"
                  id="token"
                  placeholder="Access Token"
                  autoComplete="off"
                  value={token}
                  onChange={this.updateToken}
                />
              </div>
            </form>
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
                <button type="reset" className="btn btn-secondary" onClick={this.goHome}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" onClick={this.submit} disabled={!canSubmit}>
                  {isLoading ? 'Saving...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditForm;

