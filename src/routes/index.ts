import express from 'express';
import userRouter from './userRoute';
import authRouter from './authRoute';

import teamMemberRouter from './teamMemberRoute';
import serviceRouter from './serviceRoute';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/team-members', teamMemberRouter);
router.use('/services', serviceRouter);

export default router;