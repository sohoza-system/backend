import express from 'express';
import * as contactController from '../controllers/contactController';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateContactMessage } from '../middleware/validate.middleware';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactMessage:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - message
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         subject:
 *           type: string
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Send a contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactMessage'
 *     responses:
 *       201:
 *         description: Sent
 */
router.post('/', validateContactMessage, contactController.createContactMessage);

/**
 * @swagger
 * /contact:
 *   get:
 *     summary: Get all contact messages (Admin only)
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
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
 *         description: Number of messages per page
 *     responses:
 *       200:
 *         description: List of contact messages
 */
router.get('/', authenticate, authorize(["ADMIN", "SUPERADMIN"]), contactController.getAllContactMessages);

export default router;
