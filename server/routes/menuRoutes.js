import express from 'express';
import {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemAvailability
} from '../controllers/menuController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { requireDB } from '../middleware/dbMiddleware.js';

const router = express.Router();

// Require active MongoDB connection for menu operations
router.use(requireDB);

// Public routes
router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);

// Protected administrative routes
router.post('/', protect, authorize('admin', 'staff'), createMenuItem);
router.put('/:id', protect, authorize('admin', 'staff'), updateMenuItem);
router.patch('/:id/availability', protect, authorize('admin', 'staff'), toggleMenuItemAvailability);
router.delete('/:id', protect, authorize('admin'), deleteMenuItem);

export default router;
