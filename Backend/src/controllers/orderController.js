import * as orderService from "../services/orderService.js";

export function list(_request, response) {
  response.json(orderService.listOrders());
}

export function create(request, response) {
  const userId = request.user?.id || null;
  const order = orderService.createOrder(request.body, userId);
  response.status(201).json(order);
}
