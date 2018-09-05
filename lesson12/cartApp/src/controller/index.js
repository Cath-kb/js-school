import { getOrders } from '../models/Orders';
import { getUser } from '../models/User';

import OrderList from '../components/OrderList';
import User from '../components/User';

export async function updateOrderData(rootElement) {
  const orders = await getOrders();
  const html = OrderList(orders);

  rootElement.innerHTML = html; // eslint-disable-line no-param-reassign
}

export async function updateUserData(rootElement) {
  const user = await getUser();
  const html = User(user);

  rootElement.innerHTML = html; // eslint-disable-line no-param-reassign
}
