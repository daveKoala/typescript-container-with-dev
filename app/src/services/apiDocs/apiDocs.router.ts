import { Request, Response } from "express";
import { swaggerSpec } from "../../lib/swagger";
import Router from "express-promise-router";
import swaggerUi from "swagger-ui-express";

const router = Router();

/**
 * @swagger
 * /docs/json:
 *   get:
 *     summary: OpenAPI JSON
 *     description: JSON object following OpenAPI
 *     tags: ["API docs"]
 *     responses:
 *       200:
 *         description: JSON object representing the API docs
 *       default:
 *         description: Unexpected error
 */
router.get("/json", async (req: Request, res: Response) => {
  res.status(200).json(swaggerSpec);
});

router.get("/*", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
