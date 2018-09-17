import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import User from './../User';
import users from './../__fixtures__/users';

const user = users[1];

describe('User', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<User user={user} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should be rendered without errors', () => {
    const html = renderer.create(<User user={user} />).toJSON();
    expect(html).toMatchSnapshot();
  });
});
