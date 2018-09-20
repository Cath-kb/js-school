import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Avatar from './../Avatar';
import user from './../__fixtures__/user';

const { avatar } = user;

describe('Avatar', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Avatar avatar={avatar} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should be rendered without errors', () => {
    const html = renderer.create(<Avatar avatar={avatar} />).toJSON();
    expect(html).toMatchSnapshot();
  });
});
