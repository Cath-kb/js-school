import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Profile from "./components/Profile";
import EditForm from "./components/EditForm";

import { getGithubUser } from './model/api';

class App extends React.Component {
  state = {
    isLoading: true,
    user: null,
  };

  getUser(user) {
    getGithubUser(user)
      .then(user => this.setState({
        isLoading: false,
        user,
      }));
  }

  handleSuccess = user => {
    this.setState({
      user,
    });
  };

  componentDidMount() {
    const { user_login } = this.props.match.params;
    this.getUser(user_login);
  }

  componentDidUpdate(prevProps) {
    const { user_login } = this.props.match.params;

    if (user_login !== prevProps.match.params.user_login) {
      this.getUser(user_login);
    }
  }

  render() {
    const title = 'Github Profile Manager React App';

    const { user_login } = this.props.match.params;
    const { user, isLoading } = this.state;

    return (
      <div className="container my-5">
        <header className="header">
          <h1 className="title text-center mb-4">{title}</h1>
        </header>
        {
          isLoading ? <h2 className="my-5 text-center">Loading&hellip;</h2> :
          <Switch>
            <Route path="/:user_login/edit" render={props => <EditForm initialUser={user} {...props} onSuccess={this.handleSuccess} />} />
            <Route path="/:user_login" render={props => <Profile user={user} {...props} />} />
            <Route render={() => <Redirect to={`/${user_login}`} />} />
          </Switch>
        }
      </div>
    );
  }
}

export default App;
