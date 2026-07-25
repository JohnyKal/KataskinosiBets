import type { Request, Response } from "express";
import { UserModel } from "../models/User.model.js";
import { signToken } from "../utils/jwt.js";

export async function register(req: Request, res: Response) {
  try {
    const { name, password } = req.body;

    // validate input
    if (!name || !password) {
      return res.status(400).json({
        error: "Name and password are required",
      });
    }

    // check if user already exists
    const exists = await UserModel.findOne({ name });

    if (exists) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    // create new user
    const user = new UserModel({
      name,
      password,
    });

    await user.save();

    // generate JWT token
    const token = signToken(user._id.toString());

    // send token back to frontend
    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    });

  } catch (err: any) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

export async function login(req: Request, res: Response) {
  const data = req.body;

  //find user by name
  const user = await UserModel.findOne({ name: data.name }).select("+password");

  if (!user) {
    console.log("User not found");
    return res.status(400).json({ error: "Invalid credentials" });
  }

  //compare password
  const isValid = data.password === user.password;
  if (!isValid) {
    return res.status(400).json({ error: "Invalid credentials" });
  } else {
    console.log("You are logged in");

    //generate JWT token
    const token = signToken(user._id.toString());
    return res.status(200).json({
      message: "Logged in",
      user: {
        id: user._id,
        name: user.name,
      },
      token,
    });
  }
}
