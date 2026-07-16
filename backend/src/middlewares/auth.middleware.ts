import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface JwtPayload {
  userId: string;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): asserts req is Request & { user: JwtPayload } {

  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Unauthorized",
  });
      return ;
  }
  
  const token = authHeader.split(" ")[1];
  
  if (!token) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
