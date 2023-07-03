/* eslint-disable @typescript-eslint/ban-ts-comment */
import { isValidDocId } from "../../lib/database";
import { isValidDocumentId } from "../../middleware/isValidDocumentId";
import { Organisation, ICohort } from "../../models/Organisation";
import { IUser } from "../../models/User";
import { Request, Response, NextFunction } from "express";
import { Validator } from "../../middleware/validate";
import nextId from "../../lib/nextId";
import mongoose, { Document, Types } from "mongoose";
import Router from "express-promise-router";

const router = Router();

const { validate } = new Validator();

const OrganisationSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string",
      minLength: 1,
    },
  },
};

router.get("/all", async (req: Request, resp: Response) => {
  const query: any = {};
  if (
    req.query.continuationToken &&
    isValidDocId(`${req.query.continuationToken}`)
  ) {
    query["_id"] = { $gte: req.query.continuationToken as string };
  }
  const limit = 10;

  const organisations = await Organisation.find(query).limit(limit + 1);

  const continuationToken = nextId(organisations, limit);

  const continuationURL = continuationToken
    ? `http://localhost:8080/organisation/all?continuationToken=${continuationToken}`
    : null;

  organisations.pop();

  resp
    .status(200)
    .json({ data: organisations, continuationToken, continuationURL });
});

router.get(
  "/:id",
  isValidDocumentId("Organisation"),
  async (req: Request, resp: Response) => {
    const id = req.params.id;
    const organisation = await Organisation.findById(id);
    if (organisation === null) {
      resp.status(404).send("Organisation not found");
    } else {
      resp.status(200).json(organisation);
    }
  }
);

router.post(
  "/create",
  validate({ body: OrganisationSchema }),
  async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const newOrganisation = new Organisation(req.body);
      const response = await newOrganisation.save();

      resp.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const organisation = await Organisation.findById(req.params.id);

      if (organisation == null) {
        res
          .status(404)
          .send(`Organisation with ID ${req.params.id} not found.`);
      }
      // @ts-ignore
      (req.body as IUser).map((newUser) => {
        organisation?.users.push(newUser);
      });

      await organisation?.save();

      res.status(200).json(organisation);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/cohorts",
  async (req: Request, res: Response, next: NextFunction) => {
    const organisation = await Organisation.findById(req.params.id);
    const newCohorts: ICohort[] = req.body;

    if (organisation == null) {
      res.status(404).send(`Organisation with ID ${req.params.id} not found.`);
    }

    organisation?.cohorts.push(...newCohorts);

    await organisation?.save();

    res.status(200).json(organisation);
  }
);

router.post(
  "/:id/cohort/:cohort/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const orgId = req.params.id;
    const cohortId = req.params.cohort;

    const organisation = await Organisation.findOne({
      _id: orgId,
      //   "cohorts._id": cohortId,
    }).exec();

    if (!organisation)
      res.status(404).send(`Organisation with ID "${orgId}" not found`);

    organisation?.cohorts.forEach((cohort: Partial<ICohort & Document>) => {
      if (cohort._id === cohortId) {
        req.body.forEach((userId: string) => {
          const objId = new mongoose.Schema.Types.ObjectId(userId);
          //    Types.ObjectId(userId);
          cohort.userIds?.push(objId);
        });
      }
    });

    res.status(200).json({ organisation });
  }
);

export default router;
