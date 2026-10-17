import { getDBStatus } from '../config/db.js';

/**
 * @desc    Get API and Database health status
 * @route   GET /api/health
 * @access  Public
 */
export const getHealthStatus = (req, res) => {
  const dbStatus = getDBStatus();
  const isConnected = dbStatus.isConnected;

  const healthData = {
    status: isConnected ? 'healthy' : 'degraded',
    message: isConnected
      ? 'All systems operational: Server and MongoDB Atlas connected'
      : 'Server is running; MongoDB Atlas is currently disconnected',
    server: {
      status: 'healthy',
      uptime: `${Math.floor(process.uptime())}s`,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    },
    database: {
      provider: 'MongoDB Atlas',
      status: dbStatus.state,
      connected: isConnected,
      host: dbStatus.host,
      databaseName: dbStatus.name
    }
  };

  res.status(200).json({
    success: true,
    data: healthData,
    server: healthData.server,
    database: healthData.database
  });
};
