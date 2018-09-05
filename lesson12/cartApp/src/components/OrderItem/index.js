import template from './template.ejs';

export default ({name, params, quantity, price}) => template({
  orderItem: {name, params, quantity, price},
});
