import express from "express";
import { getLeaderboard } from "../controllers/getUsers.controller.js";

const router = express.Router();

router.get("/", getLeaderboard);

export default router;