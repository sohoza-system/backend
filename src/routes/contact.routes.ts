import express from 'express';
import * as contactController from '../controllers/contactController';

const router = express.Router();

router.post('/', contactController.createContactMessage);
router.get('/', contactController.getAllContactMessages);

export default router;
