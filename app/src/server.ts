import express, { Request, Response } from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan(':method :url :status - :response-time ms'))

app.use("/pingz", (req: Request, res: Response) => {
  res.status(200).send("OK")
});

app.listen(4000, () => {
  console.log(`server running on port 4000`);
});