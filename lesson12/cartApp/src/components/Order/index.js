import orderItemTemplate from '../OrderItem';
import template from './template.ejs';

export default ({ items }) => template({items, orderItemTemplate});
