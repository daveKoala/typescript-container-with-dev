import express, { Request, Response } from 'express';
import morgan from 'morgan';
import 'dotenv/config';

const app = express();

app.use(morgan(':method :url :status - :response-time ms'))

app.use("/pingz", (req: Request, res: Response) => {
  const details = {
    buildId: process.env.BUILD_ID || "n/a"
  }
  res.status(200).json(details)
});

app.listen(4000, () => {
  console.log(`server running on port 4000`);
  console.log(`Build ID: ${process.env.BUILD_ID}`)
});