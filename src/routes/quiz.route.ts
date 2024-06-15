import express from "express";
import { createQuiz, getQuiz, updateQuizScores } from "../controllers/quiz.controller";

const router = express.Router()

router.post("/", createQuiz)
router.get("/", getQuiz)
router.post("/score", updateQuizScores)

export default router