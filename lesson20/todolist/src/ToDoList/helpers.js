const False = () => false;
const isCompleted = ({ completed }) => completed;
const isNotCompleted = ({ completed }) => !completed;
const isDeleted = ({ deleted }) => deleted;
const isNotDeleted = ({ deleted }) => !deleted;

export const getFilterFunc = filter => (
  filter === 'all' ? isNotDeleted :
  filter === 'completed' ? todo => isCompleted(todo) && isNotDeleted(todo) :
  filter === 'not-completed' ? todo => isNotCompleted(todo) && isNotDeleted(todo) :
  filter === 'deleted' ? isDeleted :
  False
);

export const filterList = (list, filter) => list.filter(filter);

export const get = field => obj => obj[field];