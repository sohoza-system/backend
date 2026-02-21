import express from 'express';
import { prisma } from '../lib/prisma.js';
import { getPagination } from '../utils/pagination.js';
import { validatePost } from '../middlewares/validate.middleware.js';
import multer from 'multer';
import cloudinary from '../lib/cloudinary.js';

const router = express.Router();

//
// GET all posts
//


router.get('/', async (req, res) => {
  const { skip, take } = getPagination(req.query);

  try {
    const posts = await prisma.post.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
        comments: true,
        categories: true
      }
    });

    const total = await prisma.post.count();

res.json({
  data: posts,
  total,
  page: Number(req.query.page) || 1,
  totalPages: Math.ceil(total / take)
});

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});


//
// GET single post
//
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        comments: true,
        categories: true
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

//
// CREATE post
//


const upload = multer({ dest: 'uploads/' });

router.post('/', validatePost, upload.single('image'), async (req, res) => {
  const { title, content, authorId } = req.body;

  let imageUrl: string | null = null;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    imageUrl = result.secure_url;
  }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: Number(authorId),
      imageUrl
    }
  });


  res.json(post);
});

//
// UPDATE post
//
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { title, description, content, published } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        description,
        content,
        published
      }
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

//
// DELETE post
//
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.post.delete({
      where: { id }
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});
import * as postController from '../controllers/postController';

const router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;
