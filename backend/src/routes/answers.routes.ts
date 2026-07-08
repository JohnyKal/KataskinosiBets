import authMiddleware from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { findAnswers } from "../controllers/findAnswers.controller.js";
const router = Router();

router.post("/answer", authMiddleware, findAnswers);


export default router;
