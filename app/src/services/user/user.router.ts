import { Request, Response, NextFunction } from "express";
import { User } from "../../models/User";
import { isMongoDBError } from "../../lib/database";
import Router from "express-promise-router";
import { isValidDocumentId } from "../../middleware/isValidDocumentId";

const router = Router();

/**
 * Notice that Router is not calling express.Router directly! This saves duplication of try/catch bocks.
 * The error as automatically passed to next()
 */

// This route would be better in its own router file and accessed with GET '/users'

/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *       default:
 *         description: Unexpected error
 */
router.get("/all", async (req: Request, resp: Response) => {
  const users = await User.find({});

  resp.status(200).json(users);
});

/**
 * @swagger
 * /user/:id:
 *   get:
 *     summary: Retrieve a user
 *     description: Retrieve a user by id
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: ID string of the user to get
 *     responses:
 *       200:
 *         description: A user.
 *       400:
 *         description: The specified user ID is invalid.
 *       404:
 *         description: A user with the specified ID was not found.
 *       default:
 *         description: Unexpected error
 */
router.get("/:id", isValidDocumentId, async (req: Request, resp: Response) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (user === null) {
    resp.status(404).send("User not found");
  } else {
    resp.status(200).json(user);
  }
});

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a user
 *     description: Create abd return a new user
 *     responses:
 *       200:
 *         description: A user.
 */
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

/**
 * @swagger
 * /user/:id:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by id
 *     responses:
 *       200:
 *         description: ok.
 *       400:
 *         description: The specified user ID is invalid.
 *       404:
 *         description: A user with the specified ID was not found.
 *       default:
 *         description: Unexpected error
 */
router.delete(
  "/:id",
  isValidDocumentId,
  async (req: Request, resp: Response) => {
    await User.findByIdAndDelete(req.params.id).exec();

    resp.status(200).send();
  }
);

export default router;
