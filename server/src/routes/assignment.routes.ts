import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import {
  createAssignment,
  getAssignments,
  getAssignment,
  deleteAssignment,
  regenerateAssignment,
} from '../controllers/assignment.controller.js';

const router = Router();

router.post('/', upload.single('file'), createAssignment);
router.get('/', getAssignments);
router.get('/:id', getAssignment);
router.delete('/:id', deleteAssignment);
router.post('/:id/regenerate', regenerateAssignment);

export default router;
