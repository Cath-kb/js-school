import React from "react";

class Person extends React.Component {
  onClick = (e) => {
    e.preventDefault();
    this.props.onClick();
  };

  render() {
    const { person } = this.props;

    return (
      <React.Fragment>
        <h2>
          <a href="" title="Edit profile" onClick={this.onClick} className="link-styled">
            {person.name || 'no name'}
          </a>
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
