import { Schema, model, Document } from "mongoose";

export interface IBet {
  time: Date;
  answer: any;
}

export interface IUser extends Document {
  name: string;
  password: string;
  score: number;
  bets: IBet[];
}

const betSchema = new Schema<IBet>(
  {
    time: {
      type: Date,
      required: true,
    },
    answer: {
      type: Schema.Types.Mixed, // allows any type
      required: true,
    },
  },
  { _id: false } // don't create an _id for every bet
);

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  score: {
    type: Number,
    default: 0,
    min: 0,
  },

  bets: {
    type: [betSchema],
    default: [],
  },
});

export const UserModel = model<IUser>("User", userSchema);
