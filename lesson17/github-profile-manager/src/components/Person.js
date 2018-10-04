import React from "react";
import {Link} from "react-router-dom";

class Person extends React.Component {
  onClick = (e) => {
    e.preventDefault();
    this.props.onClick();
  };

  render() {
    const { person, to } = this.props;
    const name = person.name || 'no name';

    return (
      <React.Fragment>
        <img
          className="img-fluid mb-4 rounded"
          src={person.avatar.url}
          alt="User Avatar"
        />
        <h2>
          {
            to
            ? <Link to={to} title="Edit profile" className="link-styled">{name}</Link>
            : name
          }
        </h2>
        <h3>
          <a href={person.origin} target="_blank" className="link-unstyled" title="see on github">{person.login}</a>
        </h3>
        {person.company && <p>{person.company}</p>}
        {person.location && <p>{person.location}</p>}
        <h4><strong>Bio:</strong></h4>
        <p>{person.bio || 'no bio entered'}</p>
      </React.Fragment>
    );
  }
}

export default Person;
