import express from 'express';
import userRouter from './user.route';
import teamMemberRouter from './teamMember.route';
import serviceRouter from './service.route';
import analyticsRouter from './analytics.route';
import postRouter from './post.route';
import contactRouter from './contact.route';
import commentRouter from './comment.route';
import categoryRouter from './category.route';
import settingsRouter from './settings.route';
import activityRouter from './activity.route';
import searchRouter from './search.route';
import mediaRouter from './media.route';
import newsletterRouter from './newsletter.route';

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

router.use('/users', userRouter);
router.use('/team-members', teamMemberRouter);
router.use('/services', serviceRouter);
router.use('/analytics', analyticsRouter);
router.use('/posts', postRouter);
router.use('/contact', contactRouter);
router.use('/comments', commentRouter);
router.use('/categories', categoryRouter);
router.use('/settings', settingsRouter);
router.use('/activities', activityRouter);
router.use('/search', searchRouter);
router.use('/media', mediaRouter);
router.use('/newsletter', newsletterRouter);

export default router;