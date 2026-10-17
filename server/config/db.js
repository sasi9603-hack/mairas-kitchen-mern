import dns from 'dns';
import mongoose from 'mongoose';

// Resolve MongoDB SRV records reliably on Windows
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {
  // Use system default if setServers fails
}

// Disable Mongoose query buffering so disconnected queries fail fast rather than hanging
mongoose.set('bufferCommands', false);

// Connection lifecycle event listeners
mongoose.connection.on('connected', () => {
  console.log(`✅ MongoDB Connection Established [${mongoose.connection.host}/${mongoose.connection.name}]`);
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ MongoDB Connection Error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB Disconnected.');
});

/**
 * Connect to MongoDB Atlas using Mongoose
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri === 'your_mongodb_atlas_connection_string') {
    console.warn(
      '⚠️  MONGODB_URI is not configured in server/.env. Please configure your Atlas connection string.'
    );
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      dbName: 'mairas_kitchen',
      serverSelectionTimeoutMS: 5000 // Fast fail for unreachable Atlas clusters
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host} / Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // If in production or explicitly requested, exit safely on initial connection failure
    if (process.env.NODE_ENV === 'production' || process.env.EXIT_ON_DB_FAIL === 'true') {
      process.exit(1);
    }
    return null;
  }
};

/**
 * Helper to get human-readable connection status
 */
export const getDBStatus = () => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const stateCode = mongoose.connection.readyState;
  return {
    state: states[stateCode] || 'unknown',
    isConnected: stateCode === 1,
    host: stateCode === 1 ? mongoose.connection.host : null,
    name: stateCode === 1 ? mongoose.connection.name : null
  };
};
