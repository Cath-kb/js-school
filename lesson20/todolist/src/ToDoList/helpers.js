const True = () => true;
const False = () => false;
const isCompleted = ({ completed }) => completed;
const isNotCompleted = ({ completed }) => !completed;

export const getFilterFunc = filter => (
  filter === 'all' ? True :
  filter === 'completed' ? isCompleted :
  filter === 'not-completed' ? isNotCompleted :
  False
);

export const filterList = (list, filter) => list.filter(filter);

export const get = field => obj => obj[field];