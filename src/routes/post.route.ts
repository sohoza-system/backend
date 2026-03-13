import express from 'express';
import * as postController from '../controllers/postController';
import { upload } from '../middleware/upload.middleware';
import { validatePost } from '../middleware/validate.middleware';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - authorId
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         content:
 *           type: string
 *         imageUrl:
 *           type: string
 *         published:
 *           type: boolean
 *         status:
 *           type: string
 *         authorId:
 *           type: integer
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts with pagination, search, and filtering
 *     tags: [Posts]
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
 *         description: Number of posts per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Keyword to search in title, content, or description
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter posts by category name
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get('/', postController.getAllPosts);

/**
 * @swagger
 * /posts/{id}/related:
 *   get:
 *     summary: Get related posts (Recommendation)
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of related posts to return
 *     responses:
 *       200:
 *         description: List of related posts
 */
router.get('/:id/related', postController.getRelatedPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post details
 */
router.get('/:id', postController.getPostById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               authorId:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created
 */
// ✅ upload.single('image') MUST come before validatePost so req.body is populated
router.post('/', upload.single('image'), validatePost, postController.createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Updated
 */
// ✅ added upload.single('image') so image updates work too
router.put('/:id', upload.single('image'), postController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete post
 *     tags: [Posts]
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
router.delete('/:id', postController.deletePost);

export default router;