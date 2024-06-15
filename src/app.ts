import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { UserRouter, LiveStreamRouter, QuizRouter } from "./routes";

export const db = new PrismaClient();

const app = express();
const port = process.env.PORT;

async function main() {
  app.use(express.json());

  console.log(await db.account.count())

  const corsOptions = {
    origin: ["http://localhost:5173"],
  };

  app.use(cors(corsOptions));

  // Register API routes
  app.use("/api/user", UserRouter.default);
  app.use("/api/livestream", LiveStreamRouter.default);
  app.use("/api/quiz", QuizRouter.default);

  // Catch unregistered routes
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
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

// app.enableCors({
//   origin: ['http://localhost:3000', "https://ofibox.vercel.app"],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
//   credentials: true,
// });
