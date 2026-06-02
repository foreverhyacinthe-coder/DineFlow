import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/authenticate.js";
import * as authController from "../controllers/authController.js";

const router = Router();

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);

export default router;
