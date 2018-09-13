import React from 'react';
import Header from './Layout/Header';
import Content from './Layout/Content';
import User from './User';

class App extends React.Component {
  render() {
    const {user} = this.props;
    const title = 'Github User Profile Static';

    return (
      <div className="container my-5">
        <Header title={title} />
        <Content>
          <User user={user} />
        </Content>
      </div>
    );
  }
}

export default App;
