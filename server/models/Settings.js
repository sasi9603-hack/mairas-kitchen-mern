import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
      default: "Maira's Kitchen",
      trim: true
    },
    tagline: {
      type: String,
      default: 'A Bistro of Flavours & Vibes',
      trim: true
    },
    address: {
      type: String,
      default:
        'Mythri Layout, Near Rythu Market, Opposite Dr. YSR Memorial Park, Islampuram, Pulivendula, Andhra Pradesh - 516390',
      trim: true
    },
    phone: {
      type: String,
      default: '+91 99599 51110',
      trim: true
    },
    whatsapp: {
      type: String,
      default: '919959951110',
      trim: true
    },
    timings: {
      type: String,
      default: '11:00 AM – 11:00 PM (All 7 Days)',
      trim: true
    },
    instagram: {
      type: String,
      default: 'https://www.instagram.com/mairaskitchen1/',
      trim: true
    },
    googleMaps: {
      type: String,
      default: 'https://maps.app.goo.gl/sGNzKd769DQMBjL76',
      trim: true
    },
    announcement: {
      type: String,
      default:
        'Big-Screen Match Screening on the Garden Lawn · Fresh Wood-Fire Dum Biryanis Ready from 12 PM & 7 PM',
      trim: true
    },
    allowReservations: {
      type: Boolean,
      default: true
    },
    allowPreOrders: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
