import authMiddleware from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { findAnswers } from "../controllers/findAnswers.controller.js";
import { getBets } from "../controllers/getBets.controller.js";
const router = Router();

router.post("/answer", authMiddleware, findAnswers);
router.get("/bets", authMiddleware, getBets);


export default router;
