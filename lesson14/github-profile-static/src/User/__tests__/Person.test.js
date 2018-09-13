import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import Person from './../Person';
import user from './../__fixtures__/user';

const { person } = user;

describe('Person', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Person person={person} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should be rendered without errors', () => {
    const html = renderer.create(<Person person={person} />).toJSON();
    expect(html).toMatchSnapshot();
  });
});
