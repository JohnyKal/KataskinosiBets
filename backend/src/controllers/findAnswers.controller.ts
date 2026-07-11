import type { Request, Response } from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/User.model.js";

export const findAnswers = async (req: Request<{ betId: string }>, res: Response) => {
  try {
    console.log(req.params);
    const { betId } = req.params ;

    if (!mongoose.Types.ObjectId.isValid(betId)) {
      return res.status(400).json({ message: "Invalid bet id" });
    }

    const objectId = new mongoose.Types.ObjectId(betId);

    const users = await UserModel.aggregate([
      {
        $match: {
          answers: {
            $elemMatch: {
              bet: objectId,
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          answer: {
            $first: {
              $filter: {
                input: "$answers",
                as: "a",
                cond: {
                  $eq: ["$$a.bet", objectId],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          answer: "$answer.answer",
        },
      },
    ]);

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};