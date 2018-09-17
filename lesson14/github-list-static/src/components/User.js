import React from 'react';

class User extends React.Component {
  render() {
    const {avatar, person} = this.props.user;

    return (
      <div className="row my-4">
        <div className="col-sm-2" data-id="user">
          <img src={avatar.url} alt="User Avatar" className="w-100 img-fluid rounded mb-4 mb-sm-0" />
        </div>
        <div className="col-sm-10">
          <h2 className="d-flex align-items-center">
            {person.login}
            {person.isAdmin && <span className="ml-4 badge badge-pill badge-dark">admin</span>}
          </h2>
          <h3><a href={person.url} target="_blank" title="Go to user profile">{person.url}</a></h3>
        </div>
      </div>
    );
  }
}

export default User;
