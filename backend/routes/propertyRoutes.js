import express from 'express';
import { 
  getProperties, 
  getPropertyById, 
  createProperty, 
  updateProperty, 
  deleteProperty,
  getOwnerDashboardStats
} from '../controllers/propertyController.js';
import { protect, ownerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProperties)
  .post(protect, ownerOnly, createProperty);

router.get('/owner/dashboard', protect, ownerOnly, getOwnerDashboardStats);

router.route('/:id')
  .get(getPropertyById)
  .put(protect, ownerOnly, updateProperty)
  .delete(protect, ownerOnly, deleteProperty);

export default router;
