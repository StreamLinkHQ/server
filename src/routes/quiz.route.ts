import express from "express";
import { createQuiz, getQuiz } from "../controllers/quiz.controller";

const router = express.Router()

router.post("/", createQuiz)
router.get("/", getQuiz)

export default router