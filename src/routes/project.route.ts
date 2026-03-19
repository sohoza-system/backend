import express from "express";
import * as projectController from "../controllers/projectController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { projectSchema } from "../validations/schemas";

const router = express.Router();

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a newly showcased project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), validate(projectSchema), projectController.createProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 */
router.get("/", projectController.getAllProjects);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 */
router.get("/:id", projectController.getProjectById);

/**
 * @swagger
 * /projects/slug/{slug}:
 *   get:
 *     summary: Get project by slug
 *     tags: [Projects]
 */
router.get("/slug/:slug", projectController.getProjectBySlug);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), validate(projectSchema), projectController.updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), projectController.deleteProject);

export default router;
