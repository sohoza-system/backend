import express from 'express';
import userRouter from './userRoute';
import authRouter from './authRoute';

import teamMemberRouter from './teamMemberRoute';
import serviceRouter from './serviceRoute';
import analyticsRouter from './analyticsRoute';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/team-members', teamMemberRouter);
router.use('/services', serviceRouter);
router.use('/analytics', analyticsRouter);

export default router;