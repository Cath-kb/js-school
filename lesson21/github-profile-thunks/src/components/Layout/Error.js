import React from 'react';

const Error = ({ error }) => (
  <h2 className="my-5 text-center">
    {
      error.message.toLowerCase() === 'not found' ?
      <div className="alert alert-warning">User Not Found</div> :
      <div className="alert alert-danger">Something went wrong</div>
    }
  </h2>
);

export default Error;
