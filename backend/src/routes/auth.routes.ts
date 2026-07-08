import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: (req as any).user });
  console.log(req.cookies);
});

export default router;
