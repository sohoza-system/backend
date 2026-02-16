import express from 'express';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

//
// GET all posts
//
router.get('/', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: true,
        categories: true
      }
    });

    res.json(posts);
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
router.post('/', async (req, res) => {
  const { title, description, content, authorId } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        content,
        authorId
      }
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
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

export default router;
