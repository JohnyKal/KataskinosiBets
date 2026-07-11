import type { Request, Response } from "express";
import { UserModel } from "../models/User.model.js";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({}, "name score").sort({ score: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};
