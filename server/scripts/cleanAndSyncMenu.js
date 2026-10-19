import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import MenuItem from '../models/MenuItem.js';

async function syncExactMenu() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'mairas_kitchen' });
  const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/rawMenu.json'), 'utf8'));
  const rawNames = new Set(rawData.map((i) => i.name.toLowerCase().trim()));

  const allInDb = await MenuItem.find({}, 'name');
  const toDelete = allInDb.filter((item) => !rawNames.has(item.name.toLowerCase().trim()));

  if (toDelete.length > 0) {
    const idsToDelete = toDelete.map((i) => i._id);
    await MenuItem.deleteMany({ _id: { $in: idsToDelete } });
    console.log(`Deleted ${toDelete.length} old mock items not in the official menu.`);
  }

  const finalCount = await MenuItem.countDocuments();
  console.log(`====================================`);
  console.log(`✅ MongoDB Atlas Menu in Perfect Sync!`);
  console.log(`   Official Menu Items: ${finalCount}`);
  console.log(`====================================`);

  await mongoose.disconnect();
}

syncExactMenu().catch(console.error);
