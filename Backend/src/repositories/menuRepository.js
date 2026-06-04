import { db } from "../data/database.js";

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
