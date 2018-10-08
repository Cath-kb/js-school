import React, { Component } from 'react';
import UserForm from './UserForm';
import UserInfo from './UserInfo';

// DO NOT Modify this file

class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="header">
          <h1>User Form</h1>
        </header>
        <UserForm />
        <UserInfo />
      </div>
    );
  }
}

export default App;
