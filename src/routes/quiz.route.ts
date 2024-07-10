import express from "express";
import { createQuiz, getQuiz, updateQuizScores, getQuizScores } from "../controllers/quiz.controller";

const router = express.Router()

router.post("/", createQuiz)
router.get("/", getQuiz)
router.post("/score", updateQuizScores)
router.get("/score", getQuizScores)

export default router