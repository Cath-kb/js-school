export const action = type => Object.assign(
  payload => ({ type, payload }),
  { type }
);

