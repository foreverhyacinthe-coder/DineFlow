import * as kitchenService from "../services/kitchenService.js";

export function getBoard(_request, response) {
  response.json(kitchenService.listKitchenBoard());
}

export function advanceTicket(request, response) {
  const board = kitchenService.advanceTicket({
    ticketId: request.body.ticketId,
    table: request.body.table,
    fromColumn: request.body.fromColumn,
    toColumn: request.body.toColumn,
  });
  response.json(board);
}

export function replaceBoard(request, response) {
  const board = kitchenService.replaceKitchenBoard(request.body);
  response.json(board);
}
