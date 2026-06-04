import { db } from "../data/database.js";

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
