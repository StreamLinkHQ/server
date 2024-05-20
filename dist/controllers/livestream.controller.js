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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStreamToken = exports.createLiveStream = void 0;
const axios_1 = __importDefault(require("axios"));
const auth_1 = require("@huddle01/server-sdk/auth");
const app_1 = require("../app");
const createLiveStream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { streamName, userId } = req.body;
        const { data } = yield axios_1.default.post("https://api.huddle01.com/api/v1/create-room", {
            title: streamName,
            hostWallets: [],
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.HUDDLE_API_KEY,
            },
        });
        yield app_1.db.liveStream.create({
            data: {
                userId,
                name: data.data.roomId,
            },
        });
        res.status(201).json({ data });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.createLiveStream = createLiveStream;
const createStreamToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomId, userType } = req.body;
        const accessToken = new auth_1.AccessToken({
            apiKey: process.env.API_KEY,
            roomId: roomId,
            role: userType === auth_1.Role.HOST ? auth_1.Role.HOST : auth_1.Role.GUEST,
            permissions: {
                admin: userType === auth_1.Role.HOST ? true : false,
                canConsume: true,
                canProduce: true,
                canProduceSources: {
                    cam: true,
                    mic: true,
                    screen: true,
                },
                canRecvData: true,
                canSendData: true,
                canUpdateMetadata: true,
            },
        });
        const token = accessToken.toJwt();
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.createStreamToken = createStreamToken;
//# sourceMappingURL=livestream.controller.js.map