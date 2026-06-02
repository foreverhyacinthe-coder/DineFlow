import * as catalogService from "../services/catalogService.js";

export function appBundle(_request, response) {
  response.json(catalogService.getAppBundle());
}

export function overview(_request, response) {
  response.json(catalogService.getOverview());
}

export function analytics(_request, response) {
  response.json(catalogService.getAnalytics());
}

export function staff(_request, response) {
  response.json(catalogService.getStaff());
}

export function billing(_request, response) {
  response.json(catalogService.getBilling());
}

export function reservations(_request, response) {
  response.json(catalogService.getReservations());
}

export function operations(_request, response) {
  response.json(catalogService.getOperations());
}

export function publicMenu(_request, response) {
  response.json(catalogService.getPublicMenu());
}
