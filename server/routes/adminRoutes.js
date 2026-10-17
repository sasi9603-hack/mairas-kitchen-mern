import express from 'express';
import {
  getDashboardOverview,
  getCustomers,
  getCustomerHistory
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { requireDB } from '../middleware/dbMiddleware.js';

const router = express.Router();

// Require active DB connection and admin/staff authentication for all admin analytics routes
router.use(requireDB);
router.use(protect);
router.use(authorize('admin', 'staff'));

router.get('/overview', getDashboardOverview);
router.get('/customers', getCustomers);
router.get('/customers/:phone/history', getCustomerHistory);

export default router;
