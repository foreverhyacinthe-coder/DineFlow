import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { optionalAuthenticate } from "../middleware/authenticate.js";
import * as orderController from "../controllers/orderController.js";

const router = Router();

router.get("/", authenticate, orderController.list);
router.post("/", optionalAuthenticate, orderController.create);

export default router;
