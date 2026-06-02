import * as menuService from "../services/menuService.js";

export function list(_request, response) {
  response.json(menuService.listMenu());
}

export function create(request, response) {
  const item = menuService.createMenuItem(request.body);
  response.status(201).json(item);
}

export function update(request, response) {
  const item = menuService.patchMenuItem(request.params.id, request.body);
  response.json(item);
}
