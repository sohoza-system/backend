import express from 'express';
import * as contactController from '../controllers/contactController';

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
router.post('/', contactController.createContactMessage);

/**
 * @swagger
 * /contact:
 *   get:
 *     summary: Get all contact messages
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: List of messages
 */
router.get('/', contactController.getAllContactMessages);

export default router;
