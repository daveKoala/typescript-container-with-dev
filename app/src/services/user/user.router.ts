import { isMongoDBError, isValidDocId } from "../../lib/database";
import { isValidDocumentId } from "../../middleware/isValidDocumentId";
import { Request, Response, NextFunction } from "express";
import { User, IUser } from "../../models/User";
import { IOrganisation, Organisation } from "../../models/Organisation";
import Router from "express-promise-router";
import nextId from "../../lib/nextId";
import { Validator } from "../../middleware/validate";
import { Document, Types } from "mongoose";

const router = Router();

const { validate } = new Validator();

const userSchema = {
  type: "object",
  required: ["firstName", "lastName"],
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
    },
    lastName: {
      type: "string",
      minLength: 1,
    },
    email: {
      type: "string",
      minLength: 6,
    },
  },
};

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
 *     tags: ["User"]
 *     parameters:
 *       - in: query
 *         name: continuationToken
 *         schema:
 *          type: string
 *          required: false
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AllUsersResponse'
 *       default:
 *         description: Unexpected error
 */
router.get("/all", async (req: Request, resp: Response) => {
  const query: any = {};
  if (
    req.query.continuationToken &&
    isValidDocId(`${req.query.continuationToken}`)
  ) {
    query["_id"] = { $gte: req.query.continuationToken as string };
  }
  const limit = 50;

  const users = await User.find(query).limit(limit + 1);

  const continuationToken = nextId(users, limit);

  const continuationURL = continuationToken
    ? `http://localhost:8080/user/all?continuationToken=${continuationToken}`
    : null;

  users.pop();

  resp.status(200).json({ data: users, continuationToken, continuationURL });
});

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Retrieve a user
 *     description: Retrieve a user by id
 *     tags: ["User"]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: ID string of the user to get
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *       400:
 *         description: The specified user ID is invalid.
 *       404:
 *         description: A user with the specified ID was not found.
 *       default:
 *         description: Unexpected error
 */
router.get(
  "/:id",
  isValidDocumentId("User"),
  async (req: Request, resp: Response) => {
    const id = req.params.id;
    const idAsObjectID = new Types.ObjectId(id);

    const organisations = await Organisation.find({ "users._id": id })
      .lean()
      .exec();

    if (organisations === null) resp.status(404).send("User not found");

    const userDetails = organisations[0].users.find(
      (user: Partial<Document & IUser>) => {
        return user._id.equals(idAsObjectID);
      }
    );

    const cleanOrganisations = organisations.map(
      (organisation: Partial<IOrganisation & Document>) => {
        delete organisation.users;
        delete organisation.__v;
        return organisation;
      }
    );

    resp.status(200).json({
      organisations: cleanOrganisations,
      user: userDetails,
    });
  }
);

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a user
 *     description: Create abd return a new user
 *     tags: ["User"]
 *     requestBody:
 *      description: Optional description in *Markdown*
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewUser'
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.post(
  "/create",
  validate({ body: userSchema }),
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
 * /user/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by id
 *     tags: ["User"]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: ID string of the user to get
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
  isValidDocumentId("User"),
  async (req: Request, resp: Response) => {
    await User.findByIdAndDelete(req.params.id).exec();

    resp.status(200).send();
  }
);

export default router;
