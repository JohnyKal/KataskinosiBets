// src/controllers/bets.controller.ts

import type { Request, Response } from "express";
import {BetModel} from "../models/Bets.model.js";

export const getBets = async (req: Request, res: Response) => {
  try {
    const bets = await BetModel.find();

    res.status(200).json(bets);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch bets",
    });
  }
};