import { ApiError } from "../utils/ApiError.js";
import { getKitchenBoard, setKitchenBoard } from "../models/store.js";

export function listKitchenBoard() {
  return getKitchenBoard();
}

export function advanceTicket({ ticketId, table, fromColumn, toColumn }) {
  const board = structuredClone(getKitchenBoard());
  const fromIndex = board.findIndex((col) => col.title === fromColumn);

  if (fromIndex === -1) {
    throw new ApiError(400, "Invalid source column.");
  }

  const ticketIndex = board[fromIndex].tickets.findIndex(
    (ticket) =>
      ticket.id === ticketId &&
      (!table || ticket.table === table || ticket.table.includes(table)),
  );

  if (ticketIndex === -1) {
    throw new ApiError(404, "Kitchen ticket not found.");
  }

  const nextIndex =
    toColumn !== undefined
      ? board.findIndex((col) => col.title === toColumn)
      : Math.min(fromIndex + 1, board.length - 1);

  if (nextIndex === -1 || nextIndex === fromIndex) {
    throw new ApiError(400, "Cannot advance ticket further.");
  }

  const [movedTicket] = board[fromIndex].tickets.splice(ticketIndex, 1);
  const nextTitle = board[nextIndex].title;
  const updatedTicket = {
    ...movedTicket,
    active: nextTitle === "Prep",
    danger: nextTitle === "Cooking" ? movedTicket.danger : false,
    complete: nextTitle === "Ready",
    time: nextTitle === "Ready" ? "Completed" : "just now",
  };

  if (nextTitle === "Prep") {
    updatedTicket.action = "Start Cooking";
  } else if (nextTitle === "Cooking") {
    updatedTicket.action = "Mark Ready";
  } else {
    delete updatedTicket.action;
  }

  board[nextIndex].tickets.unshift(updatedTicket);

  board.forEach((column) => {
    column.count = String(column.tickets.length).padStart(2, "0");
  });

  setKitchenBoard(board);
  return board;
}

export function replaceKitchenBoard(board) {
  if (!Array.isArray(board)) {
    throw new ApiError(400, "Kitchen board must be an array of columns.");
  }

  setKitchenBoard(board);
  return board;
}
