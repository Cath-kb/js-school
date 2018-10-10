import { action, createReducer } from './redux-utils';

export const interval = action('INTERVAL');

const intervalReducer = createReducer(null, {
  [interval.type]: () => Date.now()
});

export default intervalReducer;
