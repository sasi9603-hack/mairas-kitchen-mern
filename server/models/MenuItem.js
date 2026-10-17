import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
      trim: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true
    },
    categoryName: {
      type: String,
      trim: true
    },
    subcategory: {
      type: String,
      trim: true,
      default: 'General'
    },
    diet: {
      type: String,
      enum: ['veg', 'non-veg', 'egg', 'liquor'],
      required: [true, 'Dietary classification is required'],
      default: 'non-veg'
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number']
    },
    tags: {
      type: [String],
      default: []
    },
    image: {
      type: String,
      required: [true, 'Image path is required'],
      default: '/assets/images/woodfire_biryani.jpg'
    },
    ingredients: {
      type: String,
      trim: true,
      default: ''
    },
    available: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Composite text index for full-text search
menuItemSchema.index({ name: 'text', description: 'text', ingredients: 'text' });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;
