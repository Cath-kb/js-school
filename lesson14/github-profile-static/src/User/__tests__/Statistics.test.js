import React from 'react';
import ReactDOM from 'react-dom';
import renderer from "react-test-renderer";
import Statistics from './../Statistics';
import user from './../__fixtures__/user';

const { statistics } = user;

describe('Statistics', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Statistics data={statistics} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should be rendered without errors', () => {
    const html = renderer.create(<Statistics data={statistics} />).toJSON();
    expect(html).toMatchSnapshot();
  });

  it('should be 3 items', () => {
    const html = renderer.create(<Statistics data={statistics} />);
    const items = html.root.findAllByType('li');
    expect(items).toHaveLength(3);
  });
});
