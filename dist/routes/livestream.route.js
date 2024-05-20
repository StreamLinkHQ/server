"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const livestream_controller_1 = require("../controllers/livestream.controller");
const router = express_1.default.Router();
router.post("/", livestream_controller_1.createLiveStream);
router.post("/token", livestream_controller_1.createStreamToken);
exports.default = router;
//# sourceMappingURL=livestream.route.js.map