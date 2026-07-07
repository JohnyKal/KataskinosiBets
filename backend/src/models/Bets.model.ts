import { Schema, model, Document } from "mongoose";

export interface IBet extends Document {
  question: string;
}

const betSchema = new Schema<IBet>({
  question: {
    type: String,
    required: true,
    trim: true,
  },
});

export const BetModel = model<IBet>("Bet", betSchema);