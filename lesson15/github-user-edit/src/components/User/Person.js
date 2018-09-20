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
        <h2 className="d-flex">
          <a href={person.origin} title="see github profile" target="_blank">{person.name || 'no name'}</a>
          <button type="button" className="btn btn-primary ml-2" onClick={this.onClick}>Edit</button>
        </h2>
        <h3>{person.login}</h3>
        {person.company && <p>{person.company}</p>}
        {person.location && <p>{person.location}</p>}
        <h4><strong>Bio:</strong></h4>
        <p>{person.bio || 'no bio entered'}</p>
      </React.Fragment>
    );
  }
}

export default Person;
