import express, { Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import {
  UserRouter,
  LiveStreamRouter,
  QuizRouter,
  PaymentRouter,
} from "./routes";
import createSocketServer from "./websocket";

export const db = new PrismaClient();

const app = express();
const port = process.env.PORT;
const httpServer = createServer(app);

async function main() {
  app.use(express.json());

  // console.log(await db.account.count())

  const corsOptions = {
    origin: ["http://localhost:5173"],
  };

  createSocketServer(httpServer);

  app.use(cors(corsOptions));

  // Register API routes
  app.use("/api/user", UserRouter.default);
  app.use("/api/livestream", LiveStreamRouter.default);
  app.use("/api/quiz", QuizRouter.default);
  app.use("/api/pay", PaymentRouter.default);

  // Catch unregistered routes
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });
  
  httpServer.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await db.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
