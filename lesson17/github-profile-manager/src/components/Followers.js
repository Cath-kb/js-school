import React from 'react';

import Loading from "./Loading";
import UserList from "./UserList";

import { getFollowers } from '../model/api';

class Followers extends React.Component {
  state = {
    isLoading: true,
    userList: null,
  };

  getUserList(user) {
    getFollowers(user)
      .then(userList => this.setState({
        isLoading: false,
        userList,
      }));
  }

  componentDidMount() {
    this.getUserList(this.props.match.params.user_login);
  }

  render() {
    const { isLoading, userList } = this.state;

    return isLoading ?  <Loading /> : <UserList users={userList} />;
  }
}

export default Followers;
