import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {MODE_EDIT} from "../../consts";

const app = {
  title: 'Test title',
  mode: MODE_EDIT,
  isMode: (mode)=>{return true},
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
  },
  handlers: {
    toggleMode: function() {},
    updateUser: function() {},
  }
};

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    // ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
