import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate } from "../middleware/authenticate.js";
import * as kitchenController from "../controllers/kitchenController.js";

const router = Router();

router.get("/", kitchenController.getBoard);
router.patch("/advance", authenticate, asyncHandler(kitchenController.advanceTicket));
router.put("/", authenticate, kitchenController.replaceBoard);

export default router;
