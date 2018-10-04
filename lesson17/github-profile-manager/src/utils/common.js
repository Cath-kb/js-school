const getObjDiff = (origin, current) => {
  return Object.keys(current).reduce((diff, key) => {
    if (origin[key] === current[key]) return diff;
    return {
      ...diff,
      [key]: current[key],
    }
  }, {});
};

const hasObjDiff = (origin, current) => {
  return !!Object.values(getObjDiff(origin, current)).length;
};

export { getObjDiff, hasObjDiff };
