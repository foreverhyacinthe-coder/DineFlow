import express from "express";
import { corsMiddleware } from "./middleware/cors.js";
import { errorHandler } from "./middleware/errorHandler.js";
import apiRoutes from "./routes/index.js";
import { ApiError } from "./utils/ApiError.js";
import morgan from 'morgan'
export function createApp() {
  const app = express();

  app.use(morgan('dev'))
  app.use(corsMiddleware);
  app.use(express.json());

  app.use("/api", apiRoutes);

  app.use((_request, _response, next) => {
    next(new ApiError(404, "Route not found."));
  });

  app.use(errorHandler);

  return app;
}
