import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slugify.js";
import { MenuItem } from "../models/MenuItem.js";
import {
  addMenuItem,
  findMenuById,
  getAllMenu,
  updateMenuItem,
} from "../models/store.js";

export function listMenu() {
  return getAllMenu();
}

export function createMenuItem(body) {
  const name = String(body.name || "").trim();
  const price = Number(body.price);

  if (!name || Number.isNaN(price) || price <= 0) {
    throw new ApiError(400, "Menu item requires name and a valid price.");
  }

  let id = body.id || slugify(name);

  if (findMenuById(id)) {
    id = `${id}-${Date.now()}`;
  }

  const item = new MenuItem({
    id,
    name,
    shortName: body.shortName || name,
    description: body.description,
    category: body.category || "Mains",
    prepTime: body.prepTime,
    price,
    taxRate: body.taxRate,
    image: body.image,
    margin: body.margin ?? 50,
    orders: 0,
    satisfaction: 0,
    rating: 4.8,
    status: "In Stock",
  });

  addMenuItem(item);
  return item.toJSON();
}

export function patchMenuItem(id, body) {
  const existing = findMenuById(id);

  if (!existing) {
    throw new ApiError(404, "Menu item not found.");
  }

  const updates = {};

  if (body.status !== undefined) {
    updates.status = body.status;
  }

  if (body.name !== undefined) {
    updates.name = String(body.name).trim();
  }

  if (body.price !== undefined) {
    const price = Number(body.price);
    if (Number.isNaN(price) || price <= 0) {
      throw new ApiError(400, "Price must be a positive number.");
    }
    updates.price = price;
  }

  if (body.description !== undefined) {
    updates.description = body.description;
  }

  if (body.category !== undefined) {
    updates.category = body.category;
  }

  const updated = updateMenuItem(id, updates);
  return updated.toJSON();
}
