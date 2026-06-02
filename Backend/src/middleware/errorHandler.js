import { ApiError } from "../utils/ApiError.js";

export function errorHandler(error, _request, response, _next) {
  const statusCode = error.statusCode || 500;
  const message =
    error instanceof ApiError
      ? error.message
      : "An unexpected server error occurred.";

  if (statusCode >= 500) {
    console.error(error);
  }

  response.status(statusCode).json({ error: message });
}
