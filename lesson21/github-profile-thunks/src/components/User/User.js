import React from "react";
import Avatar from "./Avatar";
import Person from "./Person";
import Statistics from "./Statistics";

class User extends React.Component {
  render() {
    const {avatar, person, statistics} = this.props.user;
    return (
      <div className="row">
        <div className="col-md-6  mb-4">
          <Avatar avatar={avatar} />
        </div>
        <div className="col-md-6">
          <Person person={person} />
          <Statistics data={statistics} />
        </div>
      </div>
    );
  }
}

export default User;
