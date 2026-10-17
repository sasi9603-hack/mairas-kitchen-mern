import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  createReservation,
  getReservations,
  updateReservationStatus
} from '../controllers/reservationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { requireDB } from '../middleware/dbMiddleware.js';

const router = express.Router();

// Validation middleware
const validateReservation = [
  body('customerName')
    .trim()
    .notEmpty()
    .withMessage('Customer name is required')
    .isLength({ max: 80 })
    .withMessage('Customer name cannot exceed 80 characters'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .isLength({ min: 7, max: 20 })
    .withMessage('Phone number must be between 7 and 20 digits'),
  body('reservationDate')
    .trim()
    .notEmpty()
    .withMessage('Reservation date is required'),
  body('reservationTime')
    .trim()
    .notEmpty()
    .withMessage('Reservation time is required'),
  body('guestCount')
    .trim()
    .notEmpty()
    .withMessage('Guest count is required'),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email address'),
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

// Public route to book table (validates fields first, then requires active DB)
router.post('/', validateReservation, requireDB, createReservation);

// Protected routes to manage reservations
router.get('/', protect, authorize('admin', 'staff'), requireDB, getReservations);
router.patch('/:id/status', protect, authorize('admin', 'staff'), requireDB, updateReservationStatus);

export default router;
