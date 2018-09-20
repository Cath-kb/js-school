import React from 'react';

import User from './User';
import Form from './User/Form';

import { MODE_VIEW, MODE_EDIT, MODE_LOAD } from '../consts';

import { getGithubUser, updateGithubUser } from '../model/api';

class App extends React.Component {
  state = {
    mode: MODE_LOAD,
    user: null,
  };

  toggleMode = () => {
    this.setState({
      mode: this.state.mode === MODE_VIEW ? MODE_EDIT : MODE_VIEW,
    });
  };

  updateUser = (person) => {
    this.setState({
      mode: MODE_LOAD,
    });
    updateGithubUser(person)
      .then(user => this.setState({
        mode: MODE_VIEW,
        user,
      }));
  };

  isMode(mode) {
    return this.state.mode === mode;
  }

  componentDidMount() {
    getGithubUser('js-school-user')
      .then(user => this.setState({
        mode: MODE_VIEW,
        user,
      }));
  }

  render() {
    const { user } = this.state;

    const title = `Github User Profile Fetching and Updating ${this.isMode(MODE_EDIT) ? '(Edit)': ''}`;

    return (
      <div className="container my-5">
        <header className="header">
          <h1 className="title text-center mb-4">{title}</h1>
        </header>
        {this.isMode(MODE_VIEW) && <User user={user} onClick={this.toggleMode} />}
        {this.isMode(MODE_EDIT) && <Form user={user} onReset={this.toggleMode} onSubmit={this.updateUser} />}
        {this.isMode(MODE_LOAD) && <h2 className="my-5 text-center">Loading&hellip;</h2>}
      </div>
    );
  }
}

export default App;
