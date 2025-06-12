import { Router } from "express";

const health = Router();
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Greet the user
 *     description: Returns a welcome message.
 *     responses:
 *       200:
 *         description: A successful response with a greeting message
 */
health.get("/health", function (_, res) {
  res.status(200).json({
    status: "running",
    version: "1.0.0",
  });
});

export default health;
