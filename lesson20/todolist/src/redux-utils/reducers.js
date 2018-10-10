export const mergePayload = (state, { payload }) => ({
  ...state, ...payload,
});

const callReducer = (reducer, state, action) => (
  typeof reducer === 'function'
    ? reducer(state, action)
    : state
);

export const createReducer = (intialState, reducers) => (
  (state = intialState, action) => callReducer(
    reducers[action.type], state, action
  )
);

const defaultGetId = ({ payload }) => payload.id;

export const lookupReducer = (reducer, idSelector = defaultGetId) => (
  (state, action) => {
    const id = idSelector(action);
    if (id == null) return state;
    return ({
      ...state,
      [id]: reducer(state[id], action),
    })
  }
);

export const include = (list, item) => (
  !Array.isArray(list) ? [item] :
  !list.includes(item) ? [...list, item] :
  list
);

export const exclude = (list, item) => {
  if (!Array.isArray(list)) return [];
  const index = list.indexOf(item);
  if (index < 0) return list;
  return list.slice(0, index).concat(
    list.slice(index + 1)
  );
}