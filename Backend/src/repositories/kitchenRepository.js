import { db } from "../data/database.js";

export function getKitchenBoard() {
  return db.kitchen;
}

export function setKitchenBoard(board) {
  db.kitchen = board;
  return db.kitchen;
}
