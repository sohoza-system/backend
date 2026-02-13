import express from 'express';
import userRouter from './userRoute';
import authRouter from './authRoute';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;