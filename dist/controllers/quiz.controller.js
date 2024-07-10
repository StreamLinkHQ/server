"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuizScores = exports.updateQuizScores = exports.getQuiz = exports.createQuiz = void 0;
const app_1 = require("../app");
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, reward, quizDuration, pointsPerQuestion, questions, liveStreamId, numberOfWinners } = req.body;
        const liveStream = yield app_1.db.liveStream.findFirst({
            where: {
                name: liveStreamId,
            },
        });
        const newQuiz = yield app_1.db.quiz.create({
            data: {
                title,
                description,
                reward,
                quizDuration,
                pointsPerQuestion,
                numberOfWinners,
                questions: {
                    create: questions.map((e) => ({
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
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
});
exports.createQuiz = createQuiz;
const getQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { meetingId } = req.query;
        const liveStream = yield app_1.db.liveStream.findFirst({
            where: {
                name: meetingId,
            },
        });
        const quiz = yield app_1.db.quiz.findFirst({
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
    }
    catch (error) {
        res.status(404).json({ error });
    }
});
exports.getQuiz = getQuiz;
const updateQuizScores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quizId, score, userId } = req.body;
        const updatedQuiz = yield app_1.db.score.create({
            data: {
                quizId,
                score,
                userId,
            },
        });
        console.log(updatedQuiz);
        res.status(200).json(updatedQuiz);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.updateQuizScores = updateQuizScores;
const getQuizScores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { meetingId } = req.query;
        const liveStream = yield app_1.db.liveStream.findFirst({
            where: {
                name: meetingId,
            },
        });
        const quiz = yield app_1.db.quiz.findFirst({
            where: {
                liveStreamId: liveStream.id,
            },
        });
        const quizScores = yield app_1.db.score.findMany({
            where: {
                quizId: quiz.id,
            },
            include: {
                user: true,
                quiz: true
            },
        });
        res.status(200).json(quizScores);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.getQuizScores = getQuizScores;
//# sourceMappingURL=quiz.controller.js.map