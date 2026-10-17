import dns from 'dns';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import User from '../models/User.js';

// Resolve MongoDB SRV records reliably on Windows
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {
  // Use system default if setServers fails
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedAdmin = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri === 'your_mongodb_atlas_connection_string') {
    console.error('❌ MONGODB_URI is not set in server/.env.');
    process.exit(1);
  }

  const email = (process.env.ADMIN_EMAIL || 'admin@mairaskitchen.com').toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || 'SecurePassword2026!';
  const name = process.env.ADMIN_NAME || 'Maira Admin';

  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, {
      dbName: 'mairas_kitchen',
      serverSelectionTimeoutMS: 8000
    });

    let user = await User.findOne({ email });

    const passwordHash = await User.hashPassword(password);

    if (user) {
      user.role = 'admin';
      user.name = name;
      user.passwordHash = passwordHash;
      await user.save();
      console.log(`✅ Existing user '${email}' was upgraded to administrator role.`);
    } else {
      user = await User.create({
        name,
        email,
        passwordHash,
        role: 'admin'
      });
      console.log(`✅ New admin user '${email}' created successfully.`);
    }

    console.log('====================================');
    console.log(`🛡️  Admin Account Configured:`);
    console.log(`   • Name:  ${user.name}`);
    console.log(`   • Email: ${user.email}`);
    console.log(`   • Role:  ${user.role}`);
    console.log('====================================');

    await mongoose.disconnect();
    console.log('🔌 Disconnected safely.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error configuring admin account:', error.message);
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
};

seedAdmin();
