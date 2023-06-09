import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../models/User";
import { isMongoDBError } from '../../lib/database';

const router = Router();

router.get("/:id", async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    resp.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/create",
  async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const newUser = new User(req.body);
      const response = await newUser.save();

      resp.status(200).json(response);
    } catch (error) {
      if (isMongoDBError(error)) {
        resp.status(409).json(error);
      }
      next(error);
    }
  }
);

router.delete(
  "/:id",
  async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const deleteUser = await User.findByIdAndDelete(req.params.id).exec();

      resp.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
