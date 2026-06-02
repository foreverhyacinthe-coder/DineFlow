import * as authService from "../services/authService.js";

export async function register(request, response) {
  const session = await authService.registerUser(request.body);
  response.status(201).json(session);
}

export async function login(request, response) {
  const session = await authService.loginUser(
    request.body.email,
    request.body.password,
  );
  response.json(session);
}

export function logout(_request, response) {
  response.json({ ok: true, message: "Signed out successfully." });
}

export function me(request, response) {
  const profile = authService.getCurrentUser(request.user.id);
  response.json({ user: profile });
}
