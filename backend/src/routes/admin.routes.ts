import express from "express";

import {
 getAllAnswers,
 createBet,
 updateAnswer,
 deleteAnswer
} from "../controllers/admin.controller.js";


const router = express.Router();


router.get(
 "/answers",
 getAllAnswers
);


router.post(
 "/bets",
 createBet
);


router.patch(
 "/answers/:userId/:betId",
 updateAnswer
);


router.delete(
 "/answers/:userId/:betId",
 deleteAnswer
);


export default router;