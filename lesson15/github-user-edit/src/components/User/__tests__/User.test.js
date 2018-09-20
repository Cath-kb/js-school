import React from 'react';
import ReactDOM from 'react-dom';
import User from './../User';
import user from './../__fixtures__/user';
import renderer from "react-test-renderer";

describe('User', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<User user={user}>
    </User>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should be rendered without errors', () => {
    const html = renderer.create(<User user={user}/>).toJSON();
    expect(html).toMatchSnapshot();
  });
});
