import { Request, Response, NextFunction } from "express";
import { isValidDocId } from "../../lib/database";

/**
 * Tests if the request param with key ':id' is a valid document ID
 * @param req
 * @param resp
 * @param next
 */
export const isValidDocumentId = (modelName: string) => {
  return (req: Request, resp: Response, next: NextFunction) => {
    try {
      if (!isValidDocId(req.params.id || "")) {
        resp
          .status(400)
          .send(`${req.params.id} is not a valid ${modelName} ID`);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
