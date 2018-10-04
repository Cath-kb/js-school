import React from 'react';
import { Link } from "react-router-dom";

const UserList = ({ users }) => (
  <ul className="list-unstyled">
    {users.map(user => (
      <li key={user.login}>
        <div className="row">
          <div className="col-sm-2">
            <img
              className="img-fluid mb-4 rounded"
              src={user.avatar.url}
              alt="User Avatar"
            />
          </div>
          <div className="col-sm-10">
            <h3>
              <Link to={`/${user.login}`} title="See profile" className="link-styled">
                {user.login}
              </Link>
            </h3>
            <p>
              <a href={user.origin} target="_blank" title="See on GitHub" className="link-styled link-external">
                {user.origin}
              </a>
            </p>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default UserList;