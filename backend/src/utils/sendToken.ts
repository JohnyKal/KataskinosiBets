import type {Response} from "express";

export const sendToken =(res: Response, token: string) => {
 res.cookie("token", token, {
    httpOnly: true,
    secure: true
    //process.env.NODE_ENV === "production"
     ,
    sameSite: "none",
 });
};