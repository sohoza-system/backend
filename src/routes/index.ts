import express from 'express';
import userRouter from './userRoute';
import authRouter from './authRoute';

import teamMemberRouter from './teamMemberRoute';
import serviceRouter from './serviceRoute';
import analyticsRouter from './analyticsRoute';
import postRouter from './post.routes';
import contactRouter from './contact.routes';

import prisma from '../lib/prisma';

const router = express.Router();

router.get('/models', (req, res) => {
    res.json({
        hasTeamMember: 'teamMember' in prisma,
        hasService: 'service' in prisma,
        hasPost: 'post' in prisma,
        modelKeys: Object.keys(prisma).filter(k => !k.startsWith('$'))
    });
});

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/team-members', teamMemberRouter);
router.use('/services', serviceRouter);
router.use('/analytics', analyticsRouter);
router.use('/posts', postRouter);
router.use('/contact', contactRouter);

export default router;