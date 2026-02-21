import express from "express";
import * as teamMemberController from "../controllers/teamMemberController";

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
 *           enum: [active, inactive]
 */

/**
 * @swagger
 * /team-members:
 *   post:
 *     summary: Create a new team member
 *     tags: [Team Members]
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
router.post("/", teamMemberController.createTeamMember);

/**
 * @swagger
 * /team-members:
 *   get:
 *     summary: Get all team members
 *     tags: [Team Members]
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
 *     summary: Update team member
 *     tags: [Team Members]
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
router.put("/:id", teamMemberController.updateTeamMember);

/**
 * @swagger
 * /team-members/{id}:
 *   delete:
 *     summary: Delete team member
 *     tags: [Team Members]
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
router.delete("/:id", teamMemberController.deleteTeamMember);

export default router;
