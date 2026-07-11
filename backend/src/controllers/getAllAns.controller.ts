import type { Request, Response } from "express";
import { UserModel } from "../models/User.model.js";
import { BetModel } from "../models/Bets.model.js";


// GET ALL USER ANSWERS
export async function getAllAnswers(
  req: Request,
  res: Response
) {
  try {

    const users = await UserModel.find()
      .populate("answers.bet", "question");


    const answers:any[] = [];


    users.forEach((user) => {

      user.answers.forEach((answer:any) => {

        answers.push({
          _id: answer._id,
          userId: user._id,
          name: user.name,
          bet: answer.bet?.question || "Deleted bet",
          betId: answer.bet?._id,
          answer: answer.answer,
          time: answer.time,
        });

      });

    });


    answers.sort(
      (a,b) =>
        new Date(b.time).getTime() -
        new Date(a.time).getTime()
    );


    res.status(200).json(answers);


  } catch(error){

    console.error(error);

    res.status(500).json({
      message:"Failed fetching answers"
    });

  }
}




// CREATE BET
export async function createBet(
  req:Request,
  res:Response
){

  try{

    const {question}=req.body;


    if(!question){
      return res.status(400).json({
        message:"Question required"
      });
    }


    const bet = await BetModel.create({
      question
    });


    res.status(201).json({
      message:"Bet created",
      bet
    });


  }catch(error){

    console.error(error);

    res.status(500).json({
      message:"Failed creating bet"
    });

  }

}




// UPDATE USER SCORE / ANSWER CHECK
export async function updateAnswer(
  req:Request,
  res:Response
){

  try{

    const {
      userId,
      betId
    } = req.params;


    const {
      value
    } = req.body;



    /*
      Here you can decide what happens:

      value = correct answer
      compare with user's answer
      increase score
    */


    const user = await UserModel.findById(userId);


    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }


    const answer = user.answers.find(
      (a:any)=>
        a.bet.toString() === betId
    );


    if(!answer){

      return res.status(404).json({
        message:"Answer not found"
      });

    }


    if(answer.answer === value){

      user.score += 1;

    }


    await user.save();



    res.status(200).json({
      message:"Answer checked",
      score:user.score
    });


  }catch(error){

    console.error(error);

    res.status(500).json({
      message:"Failed updating answer"
    });

  }

}





// DELETE ANSWER
export async function deleteAnswer(
  req:Request,
  res:Response
){

  try{

    const {
      userId,
      betId
    } = req.params;



    const user = await UserModel.findById(userId);



    if(!user){

      return res.status(404).json({
        message:"User not found"
      });

    }



    user.answers =
      user.answers.filter(
        (answer:any)=>
          answer.bet.toString() !== betId
      );



    await user.save();



    res.status(200).json({
      message:"Answer removed"
    });



  }catch(error){

    console.error(error);

    res.status(500).json({
      message:"Failed deleting answer"
    });

  }

}