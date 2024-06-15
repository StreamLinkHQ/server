"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quiz_controller_1 = require("../controllers/quiz.controller");
const router = express_1.default.Router();
router.post("/", quiz_controller_1.createQuiz);
router.get("/", quiz_controller_1.getQuiz);
exports.default = router;
//# sourceMappingURL=quiz.route.js.map