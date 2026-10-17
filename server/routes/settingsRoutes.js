import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { requireDB } from '../middleware/dbMiddleware.js';

const router = express.Router();

router.use(requireDB);

// Public route to read current settings
router.get('/', getSettings);

// Protected route for administrator to update settings
router.put('/', protect, authorize('admin'), updateSettings);

export default router;
