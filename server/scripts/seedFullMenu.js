import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

// Resolve MongoDB SRV records reliably on Windows
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch {
  // Use system default if setServers fails
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

import MenuItem from '../models/MenuItem.js';

const rawDataPath = path.join(__dirname, '../data/rawMenu.json');
const rawItems = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));

const CATEGORY_META = {
  'Soups': {
    id: 'soups',
    name: 'Soups',
    shortName: 'Soups',
    icon: '🥣',
    image: '/assets/images/rambo_chicken.jpg',
    description: 'Steaming hot, rich, and comforting soups made with fresh vegetables, chicken, and house-blended seasonings.',
    subcategories: ['Veg Soups', 'Non-Veg Soups']
  },
  'Salads': {
    id: 'salads',
    name: 'Salads & Accompaniments',
    shortName: 'Salads',
    icon: '🥗',
    image: '/assets/images/garden_ambience.jpg',
    description: 'Crispy garden salads, fresh cucumber cuts, and cooling raitas to accompany your feast.',
    subcategories: ['Fresh Salads', 'Raitas']
  },
  'Veg Starters': {
    id: 'veg-starters',
    name: 'Veg Starters',
    shortName: 'Veg Starters',
    icon: '🥬',
    image: '/assets/images/rambo_chicken.jpg',
    description: 'Crispy, crunchy, and wok-tossed vegetarian delights packed with garlic, pepper, and Rayalaseema spice.',
    subcategories: ['Paneer Specials', 'Crisp & Manchurian']
  },
  'Non-Veg Starters': {
    id: 'non-veg-starters',
    name: 'Non-Veg Starters',
    shortName: 'Non-Veg Starters',
    icon: '🍗',
    image: '/assets/images/rambo_chicken.jpg',
    description: 'Signature crispy chicken wings, spicy mutton roasts, and seasoned egg appetizers.',
    subcategories: ['Chicken Starters', 'Mutton Starters', 'Egg Starters']
  },
  'Seafood Starters': {
    id: 'seafood-starters',
    name: 'Seafood Starters',
    shortName: 'Seafood',
    icon: '🍤',
    image: '/assets/images/rambo_chicken.jpg',
    description: 'Coastal spiced Apollo fish, crispy tawa fish, and juicy garlic butter prawns.',
    subcategories: ['Fish Specials', 'Prawns Specials']
  },
  'Breads': {
    id: 'breads',
    name: 'Indian Breads & Tandoor',
    shortName: 'Breads',
    icon: '🫓',
    image: '/assets/images/tandoor_platter.jpg',
    description: 'Hot clay-oven baked rotis, buttery naans, garlic naans, and stuffed kulchas.',
    subcategories: ['Naans & Rotis', 'Stuffed Kulchas']
  },
  'Veg Kebabs': {
    id: 'veg-kebabs',
    name: 'Veg Kebabs',
    shortName: 'Veg Kebabs',
    icon: '🍢',
    image: '/assets/images/tandoor_platter.jpg',
    description: 'Smoky, charred paneer and mushroom skewers roasted over glowing charcoal embers in our clay tandoor.',
    subcategories: ['Paneer Tikkas', 'Veg Seekh']
  },
  'Non-Veg Kebabs': {
    id: 'non-veg-kebabs',
    name: 'Non-Veg Kebabs',
    shortName: 'Non-Veg Kebabs',
    icon: '🔥',
    image: '/assets/images/tandoor_platter.jpg',
    description: 'Succulent tandoori chicken, Kalmi kebabs, Reshmi and Afghani roasted skewers.',
    subcategories: ['Chicken Kebabs', 'Fish & Prawns Kebabs']
  },
  'Veg Curries': {
    id: 'veg-curries',
    name: 'Veg Curries',
    shortName: 'Veg Curries',
    icon: '🥘',
    image: '/assets/images/tandoor_platter.jpg',
    description: 'Rich, creamy paneer gravies, kaju curries, and traditional spicy mixed vegetable curries.',
    subcategories: ['Paneer Gravies', 'Kaju & Veg Curries']
  },
  'Non-Veg Curries': {
    id: 'non-veg-curries',
    name: 'Non-Veg Curries',
    shortName: 'Non-Veg Curries',
    icon: '🍛',
    image: '/assets/images/tandoor_platter.jpg',
    description: 'Slow-simmered Mutton Rogan Josh, Butter Chicken, and aromatic Rayalaseema gravies.',
    subcategories: ['Mutton Curries', 'Chicken Curries']
  },
  'Fried Rice': {
    id: 'fried-rice',
    name: 'Wok Fried Rice',
    shortName: 'Fried Rice',
    icon: '🍚',
    image: '/assets/images/woodfire_biryani.jpg',
    description: 'Sizzling wok-tossed basmati rice with farm vegetables, chicken, egg, and spicy Schezwan sauce.',
    subcategories: ['Veg Fried Rice', 'Non-Veg Fried Rice']
  },
  'Noodles': {
    id: 'noodles',
    name: 'Tossed Noodles',
    shortName: 'Noodles',
    icon: '🥢',
    image: '/assets/images/rambo_chicken.jpg',
    description: 'Flavorsome wok noodles stir-fried with crunchy vegetables, eggs, and chicken strips.',
    subcategories: ['Veg Noodles', 'Non-Veg Noodles']
  },
  'Biryanis': {
    id: 'biryanis',
    name: 'Wood-Fire Biryanis',
    shortName: 'Biryani',
    icon: '🍲',
    image: '/assets/images/woodfire_biryani.jpg',
    description: 'Traditional dum-cooked biryanis in earthen pots with aged basmati, saffron, and tender meats.',
    subcategories: ['Chicken Biryanis', 'Mutton & Seafood', 'Veg & Egg Biryani']
  },
  'Pulao': {
    id: 'pulao',
    name: 'Authentic Pulao',
    shortName: 'Pulao',
    icon: '🌾',
    image: '/assets/images/woodfire_biryani.jpg',
    description: 'Rich Andhra and Rayalaseema spiced pulaos finished with roasted cashews and pure desi ghee.',
    subcategories: ['Non-Veg Pulao', 'Veg Pulao']
  },
  'Platters': {
    id: 'platters',
    name: 'Feast Platters',
    shortName: 'Platters',
    icon: '🍱',
    image: '/assets/images/tandoor_platter.jpg',
    description: 'Sumptuous sharing platters combining popular kebabs, starters, dips, and sides.',
    subcategories: ['Non-Veg Platters', 'Seafood & Mixed Platters']
  },
  'Pot Biryani': {
    id: 'pot-biryani',
    name: 'Earthen Pot Biryani',
    shortName: 'Pot Biryani',
    icon: '🏺',
    image: '/assets/images/woodfire_biryani.jpg',
    description: 'Heritage wood-fire handi biryanis sealed with whole dough and steamed in earthen clay pots.',
    subcategories: ['Signature Handi']
  },
  'Desserts': {
    id: 'desserts',
    name: 'Desserts & Sweets',
    shortName: 'Desserts',
    icon: '🍨',
    image: '/assets/images/dessert_delight.jpg',
    description: 'Sweet royal treats to conclude your meal, including Double Ka Meetha, Kadhu Ka Kheer, and warm Gulab Jamun.',
    subcategories: ['Royal Sweets']
  }
};

function generateDescription(item) {
  const name = item.name.toLowerCase();
  const cat = item.category;

  if (cat === 'Soups') {
    return item.isVeg
      ? `A comforting, wholesome bowl of hot ${item.name} prepared with fresh vegetables, garlic, and aromatic herbs.`
      : `Rich and savory ${item.name} slow-simmered with tender shredded chicken, broth, and cracked black pepper.`;
  }
  if (cat === 'Salads') {
    return name.includes('raita')
      ? `Cooling spiced yogurt blended with crisp veggies, roasted cumin, and fresh mint.`
      : `Crisp and refreshing fresh garden greens, sliced cucumbers, tomatoes, and lime wedges.`;
  }
  if (cat === 'Veg Starters') {
    return `Crispy, flavorful ${item.name} tossed with capsicum, garlic, spring onions, and special house spices.`;
  }
  if (cat === 'Non-Veg Starters') {
    return name.includes('mutton')
      ? `Tender roasted young mutton pieces marinated in Rayalaseema spices and dry-fried with curry leaves.`
      : name.includes('egg') || name.includes('omelette')
      ? `Spiced ${item.name} prepared fresh with onions, green chilies, and cracked pepper.`
      : `Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.`;
  }
  if (cat === 'Seafood Starters') {
    return name.includes('fish')
      ? `Fresh boneless fish fillets seasoned with coastal masala and crisped to golden perfection.`
      : `Plump sea prawns sautéed with garlic, black pepper, curry leaves, and rich spices.`;
  }
  if (cat === 'Breads') {
    return `Freshly baked in the earthen clay tandoor, soft, hot, and delicious.`;
  }
  if (cat === 'Veg Kebabs') {
    return `Skewered fresh cottage cheese and vegetables marinated in spiced hung yogurt, charred over charcoal.`;
  }
  if (cat === 'Non-Veg Kebabs') {
    return `Juicy, smoky ${item.name} marinated in royal tandoori spices and char-grilled over embers.`;
  }
  if (cat === 'Veg Curries') {
    return `Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.`;
  }
  if (cat === 'Non-Veg Curries') {
    return `Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.`;
  }
  if (cat === 'Fried Rice') {
    return `Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.`;
  }
  if (cat === 'Noodles') {
    return `Silky noodles tossed in roaring wok flames with shredded veggies, dark soy, garlic, and spices.`;
  }
  if (cat === 'Biryanis') {
    return `Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.`;
  }
  if (cat === 'Pulao') {
    return `Fragrant spiced pulao rice cooked in pure ghee with roasted cashews and signature seasonings.`;
  }
  if (cat === 'Platters') {
    return `Grand feast platter featuring an assorted selection of signature starters, dips, and chef specialties.`;
  }
  if (cat === 'Pot Biryani') {
    return `Traditional clay pot biryani cooked with sealed earthen handi dum for unmatched rustic wood-fire aroma.`;
  }
  if (cat === 'Desserts') {
    return `Decadent sweet royal delicacy prepared with rich milk, ghee, and golden dry fruits.`;
  }

  return `Delicious ${item.name} prepared freshly using quality ingredients and traditional spices.`;
}

function getSubcategory(item) {
  const name = item.name.toLowerCase();
  const cat = item.category;

  if (cat === 'Soups') return item.isVeg ? 'Veg Soups' : 'Non-Veg Soups';
  if (cat === 'Salads') return name.includes('raita') ? 'Raitas' : 'Fresh Salads';
  if (cat === 'Veg Starters') return name.includes('paneer') ? 'Paneer Specials' : 'Crisp & Manchurian';
  if (cat === 'Non-Veg Starters') {
    if (name.includes('mutton')) return 'Mutton Starters';
    if (name.includes('egg') || name.includes('omelette')) return 'Egg Starters';
    return 'Chicken Starters';
  }
  if (cat === 'Seafood Starters') return name.includes('fish') ? 'Fish Specials' : 'Prawns Specials';
  if (cat === 'Breads') return name.includes('kulcha') ? 'Stuffed Kulchas' : 'Naans & Rotis';
  if (cat === 'Veg Kebabs') return name.includes('seekh') ? 'Veg Seekh' : 'Paneer Tikkas';
  if (cat === 'Non-Veg Kebabs') return (name.includes('fish') || name.includes('prawns')) ? 'Fish & Prawns Kebabs' : 'Chicken Kebabs';
  if (cat === 'Veg Curries') return name.includes('paneer') ? 'Paneer Gravies' : 'Kaju & Veg Curries';
  if (cat === 'Non-Veg Curries') return name.includes('mutton') ? 'Mutton Curries' : 'Chicken Curries';
  if (cat === 'Fried Rice') return item.isVeg ? 'Veg Fried Rice' : 'Non-Veg Fried Rice';
  if (cat === 'Noodles') return item.isVeg ? 'Veg Noodles' : 'Non-Veg Noodles';
  if (cat === 'Biryanis') {
    if (item.isVeg || name.includes('egg')) return 'Veg & Egg Biryani';
    if (name.includes('mutton') || name.includes('prawns')) return 'Mutton & Seafood';
    return 'Chicken Biryanis';
  }
  if (cat === 'Pulao') return item.isVeg ? 'Veg Pulao' : 'Non-Veg Pulao';
  if (cat === 'Platters') return (name.includes('sea food') || name.includes('mixed')) ? 'Seafood & Mixed Platters' : 'Non-Veg Platters';
  if (cat === 'Pot Biryani') return 'Signature Handi';
  if (cat === 'Desserts') return 'Royal Sweets';

  return 'General';
}

function getDiet(item) {
  if (item.isVeg === true) return 'veg';
  const name = item.name.toLowerCase();
  if (name.includes('egg') || name.includes('omelette')) return 'egg';
  return 'non-veg';
}

function getTags(item) {
  const name = item.name.toLowerCase();
  const tags = [];
  const diet = getDiet(item);

  if (diet === 'veg') tags.push('veg');

  if (
    name.includes('special') ||
    name.includes('dum') ||
    name.includes('rambo') ||
    name.includes('majestic') ||
    name.includes('full') ||
    name.includes('pot')
  ) {
    tags.push("chef's special", 'bestseller');
  } else if (
    name.includes('65') ||
    name.includes('manchurian') ||
    name.includes('butter') ||
    name.includes('lollipop') ||
    name.includes('double ka meeta')
  ) {
    tags.push('bestseller');
  } else if (
    name.includes('fry') ||
    name.includes('roast') ||
    name.includes('tikka') ||
    name.includes('pulao') ||
    name.includes('biryani')
  ) {
    tags.push('must try');
  }

  if (tags.length === 0 || (tags.length === 1 && tags[0] === 'veg')) {
    tags.push('popular');
  }

  return [...new Set(tags)];
}

function getImage(category) {
  const meta = CATEGORY_META[category];
  return meta ? meta.image : '/assets/images/woodfire_biryani.jpg';
}

// Transform all items into complete structure
let counter = 1;
const structuredItems = rawItems.map((item) => {
  const meta = CATEGORY_META[item.category] || {
    id: item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: item.category,
    shortName: item.category,
    icon: '🍽️',
    image: '/assets/images/woodfire_biryani.jpg',
    description: `Delicious ${item.category} selection.`,
    subcategories: ['General']
  };

  const itemId = `item-${String(counter++).padStart(3, '0')}`;
  const diet = getDiet(item);
  const subcategory = getSubcategory(item);
  const description = generateDescription(item);
  const tags = getTags(item);
  const image = getImage(item.category);

  return {
    id: itemId,
    itemId: itemId,
    name: item.name.trim(),
    category: meta.id,
    categoryName: meta.name,
    subcategory,
    diet,
    price: Number(item.price),
    tags,
    image,
    description,
    ingredients: `Fresh ingredients, signature spices, herbs, and chef's seasoning.`,
    available: item.isAvailable !== false
  };
});

// Build MENU_CATEGORIES array grouped by category
const categoryKeys = Object.keys(CATEGORY_META);
const menuCategories = categoryKeys.map((catKey) => {
  const meta = CATEGORY_META[catKey];
  const items = structuredItems.filter((i) => i.category === meta.id);
  return {
    id: meta.id,
    name: meta.name,
    shortName: meta.shortName,
    icon: meta.icon,
    image: meta.image,
    description: meta.description,
    subcategories: meta.subcategories,
    items
  };
});

// Update client/src/data/data.js
const dataJsPath = path.join(__dirname, '../../client/src/data/data.js');
let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

const splitMarker = 'export const MENU_CATEGORIES = [';
const splitIndex = dataJsContent.indexOf(splitMarker);

if (splitIndex !== -1) {
  const topHalf = dataJsContent.substring(0, splitIndex);
  const newContent = `${topHalf}export const MENU_CATEGORIES = ${JSON.stringify(menuCategories, null, 2)};\n`;
  fs.writeFileSync(dataJsPath, newContent, 'utf8');
  console.log(`✅ Updated client/src/data/data.js with all ${structuredItems.length} items across ${menuCategories.length} categories.`);
} else {
  console.warn('⚠️ Could not find splitMarker in client/src/data/data.js');
}

// Connect to MongoDB Atlas and Seed
async function seedToAtlas() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not configured in server/.env');
    process.exit(1);
  }

  try {
    console.log('🔄 Connecting to MongoDB Atlas (database: mairas_kitchen)...');
    await mongoose.connect(uri, {
      dbName: 'mairas_kitchen',
      serverSelectionTimeoutMS: 10000
    });
    console.log(`✅ Connected to MongoDB Atlas. Active database: ${mongoose.connection.name}`);

    let inserted = 0;
    let updated = 0;

    for (const item of structuredItems) {
      const filter = { name: item.name };
      const updateData = {
        itemId: item.itemId,
        name: item.name,
        category: item.category,
        categoryName: item.categoryName,
        subcategory: item.subcategory,
        diet: item.diet,
        price: item.price,
        tags: item.tags,
        image: item.image,
        description: item.description,
        ingredients: item.ingredients,
        available: item.available
      };

      const existing = await MenuItem.findOne(filter);
      if (existing) {
        await MenuItem.updateOne(filter, { $set: updateData });
        updated++;
      } else {
        await MenuItem.create(updateData);
        inserted++;
      }
    }

    const totalCount = await MenuItem.countDocuments();
    console.log('====================================');
    console.log(`🎉 Full Menu Seeding Complete!`);
    console.log(`   • Newly Inserted: ${inserted}`);
    console.log(`   • Updated Existing: ${updated}`);
    console.log(`   • Total Items in DB: ${totalCount}`);
    console.log('====================================');

    await mongoose.disconnect();
    console.log('🔌 Disconnected safely from MongoDB Atlas.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err.message);
    process.exit(1);
  }
}

seedToAtlas();
