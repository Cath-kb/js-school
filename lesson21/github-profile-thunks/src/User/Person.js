import React from "react";

const Person = ({person}) => (
  <div>
    <h2>{person.name}</h2>
    <h3>{person.login}</h3>
    {person.company && <p>{person.company}</p>}
    {person.location && <p>{person.location}</p>}
  </div>
);

export default Person;
