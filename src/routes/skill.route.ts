import express from "express";
import * as skillController from "../controllers/skillController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { skillSchema } from "../validations/schemas";

const router = express.Router();

/**
 * @swagger
 * /skills:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), validate(skillSchema), skillController.createSkill);

/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 */
router.get("/", skillController.getAllSkills);

/**
 * @swagger
 * /skills/{id}:
 *   get:
 *     summary: Get skill by ID
 *     tags: [Skills]
 */
router.get("/:id", skillController.getSkillById);

/**
 * @swagger
 * /skills/{id}:
 *   put:
 *     summary: Update a skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), validate(skillSchema), skillController.updateSkill);

/**
 * @swagger
 * /skills/{id}:
 *   delete:
 *     summary: Delete a skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), skillController.deleteSkill);

export default router;
