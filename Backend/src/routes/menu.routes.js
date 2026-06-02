import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import * as menuController from "../controllers/menuController.js";

const router = Router();

router.get("/", menuController.list);
router.post("/", authenticate, menuController.create);
router.patch("/:id", authenticate, menuController.update);

export default router;
