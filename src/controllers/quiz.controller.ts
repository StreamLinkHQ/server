import { Request, Response } from "express";
import { db } from "../app";

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      reward,
      quizDuration,
      pointsPerQuestion,
      questions,
      liveStreamId,
      numberOfWinners
    } = req.body;

    const liveStream = await db.liveStream.findFirst({
      where: {
        name: liveStreamId,
      },
    });

    const newQuiz = await db.quiz.create({
      data: {
        title,
        description,
        reward,
        quizDuration,
        pointsPerQuestion,
        numberOfWinners,
        questions: {
          create: questions.map((e: any) => ({
            text: e.text,
            options: {
              create: e.options,
            },
          })),
        },
        liveStreamId: liveStream.id,
      },
    });

    res.status(201).json(newQuiz);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const getQuiz = async (req: Request, res: Response) => {
  try {
    const { meetingId } = req.query;
    const liveStream = await db.liveStream.findFirst({
      where: {
        name: meetingId as string,
      },
    });
    const quiz = await db.quiz.findFirst({
      where: {
        liveStreamId: liveStream.id,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const updateQuizScores = async (req: Request, res: Response) => {
  try {
    const { quizId, score, userId } = req.body;
    const updatedQuiz = await db.score.create({
      data: {
        quizId,
        score,
        userId,
      },
    });
    console.log(updatedQuiz);
    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getQuizScores = async (req: Request, res: Response) => {
  try {
    const { meetingId } = req.query;
    const liveStream = await db.liveStream.findFirst({
      where: {
        name: meetingId as string,
      },
    });
    const quiz = await db.quiz.findFirst({
      where: {
        liveStreamId: liveStream.id,
      },
    });
    const quizScores = await db.score.findMany({
      where: {
        quizId: quiz.id,
      },
      include: {
        user: true,
        quiz: true
      },
    });
    res.status(200).json(quizScores);
  } catch (error) {
    res.status(400).json({ error });
  }
};
