import { ApiError } from "../utils/ApiError.js";
import { verifyToken } from "../services/authService.js";

export function authenticate(request, _response, next) {
  const header = request.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    next(new ApiError(401, "Authentication required."));
    return;
  }

  try {
    request.user = verifyToken(token);
    next();
  } catch (error) {
    next(error);
  }
}

export function optionalAuthenticate(request, _response, next) {
  const header = request.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme === "Bearer" && token) {
    try {
      request.user = verifyToken(token);
    } catch {
      request.user = null;
    }
  }

  next();
}
