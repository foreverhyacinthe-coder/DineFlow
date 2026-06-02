import bcrypt from "bcryptjs";
import { config } from "../config/index.js";
import { kitchenBoard, menuItems } from "../data/seed.js";
import { User } from "./User.js";
import { MenuItem } from "./MenuItem.js";

/** In-memory database (resets when the server restarts). */
export const db = {
  users: [],
  menu: [],
  orders: [],
  kitchen: structuredClone(kitchenBoard),
  initialized: false,
};

export async function initializeStore() {
  if (db.initialized) {
    return;
  }

  const passwordHash = await bcrypt.hash("dineflow123", config.bcryptRounds);

  db.users = [
    new User({
      id: "usr-alex",
      name: "Alex Sterling",
      email: "chef@dineflow.com",
      passwordHash,
      role: "Manager",
      restaurant: "The Emerald Grove",
    }),
  ];

  db.menu = menuItems.map((item) => new MenuItem(item));
  db.orders = [];
  db.kitchen = structuredClone(kitchenBoard);
  db.initialized = true;
}

export function findUserByEmail(email) {
  return db.users.find((user) => user.email === email.toLowerCase());
}

export function findUserById(id) {
  return db.users.find((user) => user.id === id);
}

export function addUser(user) {
  db.users.unshift(user);
  return user;
}

export function getAllMenu() {
  return db.menu.map((item) => item.toJSON());
}

export function findMenuById(id) {
  return db.menu.find((item) => item.id === id);
}

export function addMenuItem(item) {
  db.menu.unshift(item);
  return item;
}

export function updateMenuItem(id, updates) {
  const index = db.menu.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  Object.assign(db.menu[index], updates);
  return db.menu[index];
}

export function getAllOrders() {
  return db.orders.map((order) => order.toJSON());
}

export function addOrder(order) {
  db.orders.unshift(order);
  return order;
}

export function getKitchenBoard() {
  return db.kitchen;
}

export function setKitchenBoard(board) {
  db.kitchen = board;
  return db.kitchen;
}
