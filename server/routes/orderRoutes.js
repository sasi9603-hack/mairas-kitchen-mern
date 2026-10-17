import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderPayment
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { requireDB } from '../middleware/dbMiddleware.js';

const router = express.Router();

// Order validation middleware
const validateOrder = [
  body('customer.name')
    .trim()
    .notEmpty()
    .withMessage('Customer name is required'),
  body('customer.phone')
    .trim()
    .notEmpty()
    .withMessage('Customer phone number is required'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('items.*')
    .custom((item) => {
      const q = item.quantity !== undefined ? item.quantity : item.qty;
      if (!Number.isInteger(Number(q)) || Number(q) < 1) {
        throw new Error('Each item must have a valid quantity of at least 1');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array()
      });
    }
    next();
  }
];

// Public route to place orders (validates input first, then verifies DB)
router.post('/', validateOrder, requireDB, createOrder);
router.get('/:id', requireDB, getOrderById);

// Protected routes to view and update orders (Admin / Staff)
router.get('/', protect, authorize('admin', 'staff'), requireDB, getOrders);
router.patch('/:id/status', protect, authorize('admin', 'staff'), requireDB, updateOrderStatus);
router.patch('/:id/payment', protect, authorize('admin', 'staff'), requireDB, updateOrderPayment);

export default router;
