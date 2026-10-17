import dns from 'dns';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';
import { MENU_CATEGORIES } from '../../client/src/data/data.js';

// Resolve MongoDB SRV records reliably on Windows
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {
  // Use system default if setServers fails
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedMenu = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri === 'your_mongodb_atlas_connection_string') {
    console.error('❌ MONGODB_URI is not set in server/.env. Cannot seed database.');
    process.exit(1);
  }

  try {
    console.log('🔄 Connecting to MongoDB Atlas (database: mairas_kitchen)...');
    await mongoose.connect(uri, {
      dbName: 'mairas_kitchen',
      serverSelectionTimeoutMS: 8000
    });
    console.log(`✅ Connected to MongoDB Atlas. Active database: ${mongoose.connection.name}`);

    let insertedCount = 0;
    let updatedCount = 0;

    // Flatten all categories and items into MenuItem documents
    for (const category of MENU_CATEGORIES) {
      for (const item of category.items) {
        const itemData = {
          itemId: item.id || '',
          name: item.name.trim(),
          description: item.description.trim(),
          category: category.id,
          categoryName: category.name,
          subcategory: item.subcategory || 'General',
          diet: item.diet || 'non-veg',
          price: Number(item.price),
          tags: Array.isArray(item.tags) ? item.tags : [],
          image: item.image,
          ingredients: item.ingredients || '',
          available: true
        };

        // Match by exact name or itemId to prevent duplicates on repeated runs
        const existing = await MenuItem.findOne({
          $or: [{ name: itemData.name }, { itemId: itemData.itemId }]
        });

        if (existing) {
          await MenuItem.updateOne({ _id: existing._id }, { $set: itemData });
          updatedCount++;
        } else {
          await MenuItem.create(itemData);
          insertedCount++;
        }
      }
    }

    const totalInDb = await MenuItem.countDocuments();
    console.log('====================================');
    console.log(`🎉 Menu Seeding Summary:`);
    console.log(`   • Newly Inserted: ${insertedCount}`);
    console.log(`   • Updated Existing: ${updatedCount}`);
    console.log(`   • Total Items in DB: ${totalInDb}`);
    console.log('====================================');

    await mongoose.disconnect();
    console.log('🔌 Disconnected safely from MongoDB Atlas.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
};

seedMenu();
