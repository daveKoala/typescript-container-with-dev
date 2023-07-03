/* eslint-disable @typescript-eslint/ban-ts-comment */
import "dotenv/config";
import auth from "./middleware/auth";
import express, { Request, Response } from "express";
import morgan from "morgan";
import userRouter from "./services/user/user.router";
import apiDocsRouter from "./services/apiDocs/apiDocs.router";
import organisationRouter from "./services/organisation/organisation.router";
import healthCheckRouter from "./services/healthCheck/healthCheck.router";
import helmet from "helmet";
import * as http from "http";

export const app = express();

app
  .use(
    express.json({
      verify: (
        req: http.IncomingMessage,
        res: http.ServerResponse,
        buf: Buffer
      ) => {
        // @ts-ignore
        req.rawBody = buf.toString();
      },
      limit: "50mb",
    })
  )
  .use(express.urlencoded({ extended: true, limit: "50mb" }))
  .use(helmet())
  .use(morgan(":method :url :status - :response-time ms"));

app.use("/pingz", healthCheckRouter).use("/docs", apiDocsRouter);

app.use(auth("Add auth gate options here"));

app.use("/organisation", organisationRouter);

app.use("/user", userRouter).use((req: Request, res: Response) => {
  res.status(404).send("Not found");
});
