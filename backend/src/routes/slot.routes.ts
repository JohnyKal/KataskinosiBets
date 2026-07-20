import { Router } from "express";
import { spinSlot } from "../controllers/slot.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Spin the slot machine
router.post("/spin", authMiddleware, spinSlot);

export default router;