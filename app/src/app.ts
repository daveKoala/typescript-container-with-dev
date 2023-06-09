import 'dotenv/config';
import { cache } from "./lib/cache";
import { mongooseStatus } from "./lib/database"
import auth from './middleware/auth';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import userRouter from './services/user/user.router'

export const app = express();

app
  .use(express.json())
  .use(morgan(':method :url :status - :response-time ms'));

app.use("/pingz", async (req: Request, res: Response) => {
  const details = {
    buildId: process.env.BUILD_ID || "n/a",
    dateTime: new Date().toISOString(),
    cache: await cache.ping(),
    docStore: mongooseStatus()
  }
  res.status(200).json(details)
});

app.use(auth('Add auth gate options here'));

app.use('/user', userRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send("Not found");
})
