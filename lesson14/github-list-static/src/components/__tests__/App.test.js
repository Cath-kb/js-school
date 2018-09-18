import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import App from '../App';
import users from '../__fixtures__/users';

const app = {
  title: 'Test title',
  users,
};

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App users={app.users} title={app.title}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should be rendered without errors', () => {
    const html = renderer.create(<App users={app.users} title={app.title} />).toJSON();
    expect(html).toMatchSnapshot();
  });
});
