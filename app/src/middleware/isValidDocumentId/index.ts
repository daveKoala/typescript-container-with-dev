import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

/**
 * Tests if the request param with key ':id' is a valid document ID
 * @param req
 * @param resp
 * @param next
 */
export const isValidDocumentId = (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    console.log({
      id: req.params.id,
      test: mongoose.Types.ObjectId.isValid(req.params.id),
    });
    if (!mongoose.Types.ObjectId.isValid(req.params.id || "")) {
      resp.status(400).send("Parameter is not a valid document ID");
    }
    next();
  } catch (error) {
    next(error);
  }
};