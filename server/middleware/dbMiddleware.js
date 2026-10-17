import mongoose from 'mongoose';

/**
 * Middleware that verifies active MongoDB connection
 * Prevents requests from hanging on query buffering when DB is disconnected
 */
export const requireDB = (req, res, next) => {
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message:
        'MongoDB Atlas database is currently disconnected. Please configure a valid MONGODB_URI in server/.env and verify Atlas network access.'
    });
  }
  next();
};

export default requireDB;
