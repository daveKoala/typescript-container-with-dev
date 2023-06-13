import { Request, Response } from "express";
import Router from "express-promise-router";
import { cache } from "../../lib/cache";
import { mongooseStatus } from "../../lib/database";
import fetchOther from "../../lib/fetchOther";

const router = Router();

/**
 * @swagger
 * /pingz:
 *   get:
 *     summary: Health check
 *     description: Returns status of DB, Cache and internal coms. Build ID
 *     tags: ["Health Check"]
 *     responses:
 *       200:
 *         description: JSON object representing service state
 *       default:
 *         description: Unexpected error
 */
router.get("*", async (req: Request, res: Response) => {
  const details = {
    buildId: process.env.BUILD_ID || "n/a",
    dateTime: new Date().toISOString(),
    cache: await cache.ping(),
    docStore: mongooseStatus(),
    other: await fetchOther(process.env.BUILD_ID || "not found"),
  };
  res.status(200).json(details);
});

export default router;
