import express from "express";
import * as searchController from "../controllers/searchController";

const router = express.Router();

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Global site search
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/", searchController.globalSearch);

export default router;
