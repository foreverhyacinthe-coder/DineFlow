import { Router } from "express";
import { health } from "../controllers/healthController.js";
import authRoutes from "./auth.routes.js";
import menuRoutes from "./menu.routes.js";
import orderRoutes from "./order.routes.js";
import catalogRoutes from "./catalog.routes.js";
import kitchenRoutes from "./kitchen.routes.js";

const router = Router();

router.get("/health", health);
router.use("/auth", authRoutes);
router.use("/menu", menuRoutes);
router.use("/orders", orderRoutes);
router.use("/kitchen", kitchenRoutes);

// Dashboard & static catalog endpoints (same paths the frontend expects)
router.use("/", catalogRoutes);

export default router;
