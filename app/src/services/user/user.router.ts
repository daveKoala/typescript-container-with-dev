import { Request, Response, NextFunction } from "express";
import { User } from "../../models/User";
import { isMongoDBError } from "../../lib/database";
import Router from "express-promise-router";

const router = Router();

/**
 * Notice that Router is not calling express.Router directly! This saves duplication of try/catch bocks.
 * The error as automatically passed to next()
 */

// This route would be better in its own router file and accessed with GET '/users'
router.get("/all", async (req: Request, resp: Response) => {
  const users = await User.find({});

  resp.status(200).json(users);
});

router.get("/:id", async (req: Request, resp: Response) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (user === null) {
    resp.status(404).send("User not found");
  } else {
    resp.status(200).json(user);
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

router.delete("/:id", async (req: Request, resp: Response) => {
  await User.findByIdAndDelete(req.params.id).exec();

  resp.status(200).send();
});

export default router;
