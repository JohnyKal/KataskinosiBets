import type { Request, Response } from "express";
import { UserModel } from "../models/User.model.js";
import { BetModel } from "../models/Bets.model.js";

// GET ALL ANSWERS FROM ALL USERS
export async function getAllAnswers(req: Request, res: Response) {
  try {
    const users = await UserModel.find().populate("answers.bet", "question");

    const answers = users.flatMap((user) =>
      user.answers.map((answer: any) => ({
        userId: user._id,
        betId: answer.bet?._id,
        name: user.name,
        bet: answer.bet?.question || "Deleted bet",
        answer: answer.answer,
        time: answer.time,
      }))
    );

    answers.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    res.status(200).json(answers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch answers",
    });
  }
}

// CREATE NEW BET
export async function createBet(req: Request, res: Response) {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const bet = await BetModel.create({
      question,
    });

    res.status(201).json({
      message: "Bet created successfully",
      bet,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create bet",
    });
  }
}

// CHECK ANSWER AND UPDATE SCORE
export async function updateAnswer(req: Request, res: Response) {
  try {
    const { userId, betId } = req.params;

    const { value } = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userAnswer = user.answers.find(
      (answer) => answer.bet.toString() === betId
    );

    if (!userAnswer) {
      return res.status(404).json({
        message: "Answer not found",
      });
    }

    // If answer is correct increase score
    if (userAnswer.answer.toLowerCase() === value.toLowerCase()) {
      user.score += 1;
    }

    await user.save();

    res.status(200).json({
      message: "Answer checked",
      score: user.score,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to check answer",
    });
  }
}

// DELETE ANSWER FROM USER ANSWERS ARRAY
export async function deleteAnswer(req: Request, res: Response) {
  try {
    const { userId, betId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.answers = user.answers.filter(
      (answer) => answer.bet.toString() !== betId
    );

    await user.save();

    res.status(200).json({
      message: "Answer deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete answer",
    });
  }
}
