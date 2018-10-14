import React from 'react';
import { connect } from 'react-redux';

import { load } from '../store';

import { Header, Content, Loading, Error } from './Layout';
import User from './User';

class App extends React.Component {
  componentDidMount() {
    const { user_login } = this.props.match.params;
    this.props.loadUser(user_login);
  }

  render() {
    const { isLoading, user, error } = this.props;
    const title = 'Github User Profile Redux Thunks';

    return (
      <div className="container my-5">
        <Header title={title} />
        {isLoading ?
          <Loading /> :
          user ?
          <Content>
            <User user={user} />
          </Content> :
          error ?
          <Error error={error} /> :
          null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  user: state.user,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  loadUser: user_login => dispatch(load(user_login)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
