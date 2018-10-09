import { SET_NAME, SET_AGE, TOGGLE_IS_STUDENT } from './action-types';

const setName = name => ({
  type: SET_NAME, payload: name,
});

const setAge = age => ({
  type: SET_AGE, payload: age,
});

const toggleIsStudent = () => ({
  type: TOGGLE_IS_STUDENT,
});

export default {setName, setAge, toggleIsStudent};
