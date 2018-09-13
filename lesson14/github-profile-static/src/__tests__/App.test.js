import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './../App';

const app = {
  title: 'Test title',
  user: {
    avatar: {
      url: 'https://avatars3.githubusercontent.com/u/2164575?v=4',
    },
    person: {
      name: 'John Doe',
      login: 'joe',
      company: '',
      location: 'Aldebaran',
    },
    statistics: {
      repos: 5,
      following: 0,
      followers: 5,
    }
  }
};

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App user={app.user} title={app.title} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should be rendered without errors', () => {
    const html = renderer.create(<App user={app.user} title={app.title} />).toJSON();
    expect(html).toMatchSnapshot();
  });
});
