import { Schema, model, Document, Types } from "mongoose";

export interface IUserAnswer {
  bet: Types.ObjectId;
  answer: string;
  time: Date;
}

export interface IUser extends Document {
  name: string;
  password: string;
  score: number;
  answers: IUserAnswer[];
}

const userAnswerSchema = new Schema<IUserAnswer>(
  {
    bet: {
      type: Schema.Types.ObjectId,
      ref: "Bet",
      required: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },

    time: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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

  answers: {
    type: [userAnswerSchema],
    default: [],
  },
});

export const UserModel = model<IUser>("User", userSchema);