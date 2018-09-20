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
        <h2><a onClick={this.onClick} href="" title="Go to Edit Form">{person.name}</a></h2>
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
