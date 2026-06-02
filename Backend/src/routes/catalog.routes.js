import { Router } from "express";
import * as catalogController from "../controllers/catalogController.js";

const router = Router();

router.get("/app", catalogController.appBundle);
router.get("/overview", catalogController.overview);
router.get("/analytics", catalogController.analytics);
router.get("/staff", catalogController.staff);
router.get("/billing", catalogController.billing);
router.get("/reservations", catalogController.reservations);
router.get("/operations", catalogController.operations);
router.get("/public-menu", catalogController.publicMenu);

export default router;
