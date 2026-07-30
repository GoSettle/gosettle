import express from 'express';
import { createInquiry, getOwnerInquiries } from '../controllers/inquiryController.js';
import { protect, ownerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createInquiry);
router.get('/owner', protect, ownerOnly, getOwnerInquiries);

export default router;
