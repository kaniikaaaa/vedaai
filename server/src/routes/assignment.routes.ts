import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import {
  createAssignment,
  getAssignments,
  getAssignment,
  deleteAssignment,
  downloadPDF,
  regenerateAssignment,
} from '../controllers/assignment.controller.js';

const router = Router();

router.post('/', upload.single('file'), createAssignment);
router.get('/', getAssignments);
router.get('/:id', getAssignment);
router.delete('/:id', deleteAssignment);
router.get('/:id/pdf', downloadPDF);
router.post('/:id/regenerate', regenerateAssignment);

export default router;
