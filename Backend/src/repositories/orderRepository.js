import { db } from "../data/database.js";

export function getAllOrders() {
  return db.orders.map((order) => order.toJSON());
}

export function addOrder(order) {
  db.orders.unshift(order);
  return order;
}
