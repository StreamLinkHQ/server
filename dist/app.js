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
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const routes_1 = require("./routes");
exports.db = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.use(express_1.default.json());
        console.log(yield exports.db.account.count());
        const corsOptions = {
            origin: ["http://localhost:5173"],
        };
        app.use((0, cors_1.default)(corsOptions));
        // Register API routes
        app.use("/api/user", routes_1.UserRouter.default);
        app.use("/api/livestream", routes_1.LiveStreamRouter.default);
        app.use("/api/quiz", routes_1.QuizRouter.default);
        // Catch unregistered routes
        app.all("*", (req, res) => {
            res.status(404).json({ error: `Route ${req.originalUrl} not found` });
        });
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.db.$connect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield exports.db.$disconnect();
    process.exit(1);
}));
// app.enableCors({
//   origin: ['http://localhost:3000', "https://ofibox.vercel.app"],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
//   credentials: true,
// });
//# sourceMappingURL=app.js.map