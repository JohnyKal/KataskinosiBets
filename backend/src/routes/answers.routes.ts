import authMiddleware from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { findAnswers } from "../controllers/findAnswers.controller.js";
import { getBets } from "../controllers/getBets.controller.js";
import { submitAnswer } from "../controllers/submitAnswer.controller.js";
const router = Router();

router.get("/answer/:betId", authMiddleware, findAnswers);
router.get("/bets", authMiddleware, getBets);
router.post("/submit", authMiddleware, submitAnswer);



export default router;
