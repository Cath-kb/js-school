import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Content from './../Content';

describe('Content', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Content />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should be rendered without errors', () => {
    const html = renderer.create(<Content><p>test</p></Content>).toJSON();
    expect(html).toMatchSnapshot();
  });
});
