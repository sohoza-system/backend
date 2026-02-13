import express from 'express';
import userRouter from './userRoute';

const router = express.Router();

router.use('/users', userRouter);

export default router;