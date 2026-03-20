import express from "express";
import * as projectLeadController from "../controllers/projectLeadController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { projectLeadSchema } from "../validations/schemas";

const router = express.Router();

/**
 * @swagger
 * /leads:
 *   post:
 *     summary: Submit a new project lead/inquiry
 *     tags: [Leads]
 */
router.post("/", validate(projectLeadSchema), projectLeadController.createLead);

/**
 * @swagger
 * /leads:
 *   get:
 *     summary: Get all project leads
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), projectLeadController.getAllLeads);

/**
 * @swagger
 * /leads/{id}:
 *   get:
 *     summary: Get lead by ID
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 */
router.get("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), projectLeadController.getLeadById);

/**
 * @swagger
 * /leads/{id}/status:
 *   patch:
 *     summary: Update lead status
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/:id/status", authenticate, authorize(["ADMIN", "SUPERADMIN"]), projectLeadController.updateLeadStatus);

/**
 * @swagger
 * /leads/{id}:
 *   delete:
 *     summary: Delete a lead
 *     tags: [Leads]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), projectLeadController.deleteLead);

export default router;
