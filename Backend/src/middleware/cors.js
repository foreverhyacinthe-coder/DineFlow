import { config } from "../config/index.js";

export function corsMiddleware(request, response, next) {
  response.setHeader("Access-Control-Allow-Origin", config.corsOrigin);
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS",
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  if (request.method === "OPTIONS") {
    response.sendStatus(204);
    return;
  }

  next();
}
