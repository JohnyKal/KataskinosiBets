import type { Request, Response } from "express";
import { UserModel } from "../models/User.model.js";
import { signToken } from "../utils/jwt.js";

export async function register(req: Request, res: Response) {
  try {
    // validate input
    const data = req.body ;
    const exists = await UserModel.findOne({ name: data.name });
    if (exists) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = new UserModel({
      //create new user
      name: data.name,
      password: data.password,
    });

    await user.save(); //save the new user to database

    //generate JWT token
    const token = signToken(user._id.toString());

//check here if it need any more work with JWT token, like sending it back to the client or storing it in a cookie

    return res.status(201).json({ message: "User registered" });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  const data = req.body;
  const user = await UserModel.findOne({ name: data.name }).select(
    "+password"
  );

  //find user by email
  if (!user) {
    console.log("User not found");
    return res.status(400).json({ error: "Invalid credentials" });
  }

  //compare password
  const isValid =  data.password === user.password;
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
