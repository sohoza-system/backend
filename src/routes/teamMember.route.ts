import express from "express";
import * as teamMemberController from "../controllers/teamMemberController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { validateTeamMember } from "../middleware/validate.middleware";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     TeamMember:
 *       type: object
 *       required:
 *         - name
 *         - role
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         role:
 *           type: string
 *         email:
 *           type: string
 *         bio:
 *           type: string
 *         image:
 *           type: string
 *         status:
 *           type: string
 */

/**
 * @swagger
 * /team-members:
 *   post:
 *     summary: Create a new team member (Admin only)
 *     tags: [Team Members]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamMember'
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", authenticate, authorize(["ADMIN", "SUPERADMIN"]), validateTeamMember, teamMemberController.createTeamMember);

/**
 * @swagger
 * /team-members:
 *   get:
 *     summary: Get all team members
 *     tags: [Team Members]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of members per page
 *     responses:
 *       200:
 *         description: List of team members
 */
router.get("/", teamMemberController.getAllTeamMembers);

/**
 * @swagger
 * /team-members/{id}:
 *   get:
 *     summary: Get team member by ID
 *     tags: [Team Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team member details
 */
router.get("/:id", teamMemberController.getTeamMemberById);

/**
 * @swagger
 * /team-members/{id}:
 *   put:
 *     summary: Update team member (Admin only)
 *     tags: [Team Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamMember'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), teamMemberController.updateTeamMember);

/**
 * @swagger
 * /team-members/{id}:
 *   delete:
 *     summary: Delete team member (Admin only)
 *     tags: [Team Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/:id", authenticate, authorize(["ADMIN", "SUPERADMIN"]), teamMemberController.deleteTeamMember);

/**
 * @swagger
 * /team-members/reorder:
 *   patch:
 *     summary: Reorder team members (Admin only)
 *     tags: [Team Members]
 *     security:
 *       - bearerAuth: []
 */
router.patch("/reorder", authenticate, authorize(["ADMIN", "SUPERADMIN"]), teamMemberController.reorderTeamMembers);

export default router;
