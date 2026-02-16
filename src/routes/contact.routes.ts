import express from 'express';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

//
// CREATE contact message
//
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = await prisma.contactMessage.create({
      data: { name, email, message }
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

//
// GET all messages (admin use)
//
router.get('/', async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;
