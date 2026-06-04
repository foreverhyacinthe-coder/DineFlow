import bcrypt from "bcryptjs";
import { config } from "../config/index.js";
import { kitchenBoard, menuItems } from "./seed.js";
import { MenuItem } from "../models/MenuItem.js";
import { User } from "../models/User.js";

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
