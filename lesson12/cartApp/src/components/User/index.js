import template from './template.ejs';

export default ({name, email, phone, address, city, country}) => template({
  user: {name, email, phone, address, city, country},
});
