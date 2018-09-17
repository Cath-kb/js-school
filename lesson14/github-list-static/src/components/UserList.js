import React from 'react';
import User from './User';

class UserList extends React.Component {
  render() {
    const {users} = this.props;

    return (
      <React.Fragment>
        {users.map(user => (
            <User user={user} key={user.id} />
          )
        )}
      </React.Fragment>
    );
  }
}

export default UserList;
