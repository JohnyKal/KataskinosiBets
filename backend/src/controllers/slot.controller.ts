import type { Request, Response } from "express";
import { UserModel } from "../models/User.model.js";

const symbols = [
  { text: "ΠΑΙΔΙ", emoji: "✨", reward: 12, chance: 10.5 },
  { text: "ΣΟΣ", emoji: "🔥", reward: 16, chance: 10.2 },
  { text: "ΟΜΑΔΑΡΧΗΣ", emoji: "🎉", reward: 18, chance: 6.25 },
  { text: "ΚΟΙΝΟΤΑΡΧΗΣ", emoji: "⭐", reward: 21, chance: 4.125 },
  { text: "ΑΡΧΗΓΟΣ", emoji: "🍀", reward: 50, chance: 1.925 },
];

const randomSymbol = () =>
  symbols[Math.floor(Math.random() * symbols.length)];

function rollPrize() {
  const roll = Math.random() * 100;

  let current = 0;

  for (const symbol of symbols) {
    current += symbol.chance;

    if (roll <= current) {
      return symbol;
    }
  }

  return null;
}

export async function spinSlot(req: Request, res: Response) {
  try {
    
    const userId = (req as any).user.id;
    console.log("USER ID FROM TOKEN:", (req as any).user.id);
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.score < 3) {
      return res.status(400).json({
        message: "Δεν έχεις αρκετούς πόντους.",
      });
    }

    // Cost of spin
    user.score -= 3;

    const prize = rollPrize();

    let reels;

    if (prize) {
      user.score += prize.reward;

      reels = [prize, prize, prize];
    } else {
      do {
        reels = [
          randomSymbol(),
          randomSymbol(),
          randomSymbol(),
        ];
      } while (
        reels[0].text === reels[1].text &&
        reels[1].text === reels[2].text
      );
    }

    await user.save();

    return res.json({
      win: !!prize,
      reward: prize?.reward ?? 0,
      score: user.score,
      reels,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}