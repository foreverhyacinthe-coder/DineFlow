import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.js";
import {
  addUser,
  findUserByEmail,
  findUserById,
} from "../repositories/userRepository.js";

function createToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn },
  );
}

export function buildSession(user) {
  return {
    token: createToken(user),
    user: user.toPublic(),
  };
}

export async function registerUser(payload) {
  const restaurant = String(payload.restaurant || "").trim();
  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim().toLowerCase();
  const password = String(payload.password || "");
  const confirmPassword = String(payload.confirmPassword || "");

  if (!restaurant || !name || !email || !password) {
    throw new ApiError(
      400,
      "Restaurant name, owner name, email, and password are required.",
    );
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters.");
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match.");
  }

  if (findUserByEmail(email)) {
    throw new ApiError(409, "An account with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, config.bcryptRounds);
  const user = new User({
    id: `usr-${Date.now()}`,
    name,
    email,
    passwordHash,
    role: "Owner",
    restaurant,
  });

  addUser(user);
  return buildSession(user);
}

export async function loginUser(email, password) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const plainPassword = String(password || "");

  if (!normalizedEmail || !plainPassword) {
    throw new ApiError(400, "Email and password are required.");
  }

  const user = findUserByEmail(normalizedEmail);

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const passwordMatches = await bcrypt.compare(plainPassword, user.passwordHash);

  if (!passwordMatches) {
    throw new ApiError(401, "Invalid email or password.");
  }

  return buildSession(user);
}

export function verifyToken(token) {
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    const user = findUserById(payload.sub);

    if (!user) {
      throw new ApiError(401, "User no longer exists.");
    }

    return user;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(401, "Invalid or expired session.");
  }
}

export function getCurrentUser(userId) {
  const user = findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user.toPublic();
}
