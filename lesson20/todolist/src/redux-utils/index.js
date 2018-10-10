import { action } from './actions';
import { mergePayload, createReducer, lookupReducer, include, exclude } from './reducers';
import { compose } from './funcs';
import { domainSelector } from './domain-selector';

export {
  action,
  mergePayload,
  createReducer,
  compose,
  lookupReducer,
  include,
  exclude,
  domainSelector,
};