import { Router } from 'express';
import multer from 'multer';
import {
    createTeamMember,
    getAllTeamMembers,
    getTeamMemberById,
    updateTeamMember,
    deleteTeamMember,
} from '../controllers/teamMemberController';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public
router.get('/',     getAllTeamMembers);
router.get('/:id',  getTeamMemberById);

// Protected
router.post('/',        authenticate, upload.single('image'), createTeamMember);
router.put('/:id',      authenticate, upload.single('image'), updateTeamMember);
router.delete('/:id',   authenticate, deleteTeamMember);

export default router;