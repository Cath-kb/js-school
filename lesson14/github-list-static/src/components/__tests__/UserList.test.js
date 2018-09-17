import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import UserList from './../UserList';
import users from './../__fixtures__/users';

describe('UserList', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserList users={users} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should be rendered without errors', () => {
    const html = renderer.create(<UserList users={users} />).toJSON();
    expect(html).toMatchSnapshot();
  });

  it('should be 2 items', () => {
    const html = renderer.create(<UserList users={users} />);
    const items = html.root.findByType(UserList).props.users;
    expect(items).toHaveLength(2);
  });
});
