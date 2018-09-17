import React from 'react';
import UserList from './UserList';

class App extends React.Component {
  render() {
    const {users} = this.props;
    const title = 'Github User List Static';

    return (
      <div className="container my-5">
        <header className="header">
          <h1 className="title text-center mb-4">{title}</h1>
        </header>
        <UserList users={users} />
      </div>
    );
  }
}

export default App;
