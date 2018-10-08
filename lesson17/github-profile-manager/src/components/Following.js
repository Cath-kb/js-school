import React from 'react';

import Loading from "./Loading";
import UserList from "./UserList";

import { getFollowing } from '../model/api';

class Following extends React.Component {
  state = {
    isLoading: true,
    userList: null,
  };

  getUserList(user) {
    getFollowing(user)
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

export default Following;
