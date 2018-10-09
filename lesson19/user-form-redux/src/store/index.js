import { createStore } from 'redux';

import a from './actions';
import reducer from './reducers';

export const store = createStore(reducer);
export const actions = a;
