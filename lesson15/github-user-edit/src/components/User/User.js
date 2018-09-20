import React from 'react';

import Avatar from "./Avatar";
import Person from "./Person";
import Statistics from "./Statistics";

class User extends React.Component {
  render() {
    const { onClick } = this.props;
    const {avatar, person, statistics } = this.props.user;

    return (
      <div className="row">
        <div className="col-md-4 text-center text-md-left mb-4">
          <Avatar avatar={avatar} />
        </div>
        <div className="col-md-8">
          <Person person={person} onClick={onClick} />
          <Statistics data={statistics} />
        </div>
      </div>
    );
  }
}

export default User;
