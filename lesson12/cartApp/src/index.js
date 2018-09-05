// eslint-disable no-undef
import { updateOrderData, updateUserData } from './controller';
import '@babel/polyfill';
import './styles.css';

window.addEventListener('load', () => {
  const rootElement = document.getElementById('demo-order-list');
  const userElement = document.getElementById('demo-user-info');

  updateOrderData(rootElement);
  updateUserData(userElement);

  window.updateOrderData = () => {
    rootElement.innerHTML = '';
    updateOrderData(rootElement);
  };
});
