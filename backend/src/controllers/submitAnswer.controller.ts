import type { Request, Response } from "express";
import {UserModel} from "../models/User.model.js";

export async function submitAnswer(req: Request, res: Response) {
  try {
    const { answer, betId } = req.body;

    if (!answer) {
      return res.status(400).json({
        message: "Answer is required",
      });
    }

    // assuming you store user id in req.user from JWT middleware
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.answers.push({
        bet: betId,
      time: new Date(),
      answer,
    });

    await user.save();

    return res.status(200).json({
      message: "Answer submitted successfully",
      answer: {
        time: new Date(),
        answer,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}