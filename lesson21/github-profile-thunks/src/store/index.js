import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { getGithubUser } from '../api';

const USER_LOADING_TYPE = 'USER::LOADING';
const USER_LOADED_TYPE = 'USER::LOADED';
const USER_FAILED_TYPE = 'USER::FAILED';

const loading = () => ({
  type: USER_LOADING_TYPE,
});

const loaded = user => ({
  type: USER_LOADED_TYPE, payload: user,
});

const failed = error => ({
  type: USER_FAILED_TYPE, payload: error,
});

export const load = (user_login) => {
  return dispatch => {
    dispatch(loading());

    getGithubUser(user_login)
    .then(user => dispatch(loaded(user)))
    .catch(err => dispatch(failed(err)));
  };
};

const initialState = {
  isLoading: true,
  user: null,
  error: null,
};

const isLoading = (state = true, { type }) => (
  type === USER_LOADING_TYPE ? true :
  type === USER_LOADED_TYPE ? false :
  type === USER_FAILED_TYPE ? false :
  state
);

const user = (state = null, { type, payload }) => (
  type === USER_LOADING_TYPE ? null :
  type === USER_LOADED_TYPE ? payload :
  type === USER_FAILED_TYPE ? null :
  state
);

const error = (state = null, { type, payload }) => (
  type === USER_LOADING_TYPE ? null :
  type === USER_LOADED_TYPE ? null :
  type === USER_FAILED_TYPE ? payload :
  state
);

export const store = createStore(
  combineReducers({ isLoading, user, error }),
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);
