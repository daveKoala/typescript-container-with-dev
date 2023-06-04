import express, { Request, Response } from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import { cache } from "./lib/cache";
import * as redis from 'redis';

const app = express();

app.use(morgan(':method :url :status - :response-time ms'))

app.use("/pingz", async (req: Request, res: Response) => {
  const details = {
    buildId: process.env.BUILD_ID || "n/a",
    dateTime: new Date().toISOString(),
    cache: await cache.ping(),
  }
  res.status(200).json(details)
});

(async () => {

  // const connectionString = `redis[s]://[[username][:password]@][host][:port][/db-number]`
  const connectionString = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
  await cache.connect(connectionString, `${process.env.REDIS_PASSWORD}`)

  app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
    console.log(`Build ID: ${process.env.BUILD_ID}`)
  });

})();
