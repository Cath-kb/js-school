import { compose } from './funcs';

export const domainSelector = selector => {
  const newSelector = state => selector(state);
  newSelector.assign = ndSelector => {
    selector = ndSelector;
  }
  newSelector.attachTo = parentSelector => {
    selector = compose(selector, parentSelector)
  }
  return newSelector;
}