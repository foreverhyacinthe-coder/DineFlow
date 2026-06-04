import { ApiError } from "../utils/ApiError.js";
import { Order } from "../models/Order.js";
import { addOrder, getAllOrders } from "../repositories/orderRepository.js";

export function listOrders() {
  return getAllOrders();
}

export function createOrder(body, userId = null) {
  const items = Array.isArray(body.items) ? body.items : [];

  if (!items.length) {
    throw new ApiError(400, "Order must include at least one item.");
  }

  const total = Number(body.total);

  if (Number.isNaN(total) || total < 0) {
    throw new ApiError(400, "Order total is invalid.");
  }

  const order = new Order({
    id: `DF-${Date.now()}`,
    status: "received",
    fulfillment: body.fulfillment || "Pickup",
    items,
    total,
    userId,
  });

  addOrder(order);
  return order.toJSON();
}
