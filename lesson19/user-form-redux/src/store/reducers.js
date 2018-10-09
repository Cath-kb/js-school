import { SET_NAME, SET_AGE, TOGGLE_IS_STUDENT } from './action-types';

const initialState = {
  name: '',
  age: '',
  isStudent: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_NAME:
      return { ...state, name: payload };
    case SET_AGE:
      return { ...state, age: payload };
    case TOGGLE_IS_STUDENT:
      return { ...state, isStudent: !state.isStudent };
    default:
      return state;
  }
};

export default reducer;
