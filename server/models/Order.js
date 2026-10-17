import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: false
    },
    menuItemId: {
      type: String, // String ID matching frontend item.id (e.g. 'biry-01')
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be positive']
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true,
        maxlength: [80, 'Name cannot exceed 80 characters']
      },
      phone: {
        type: String,
        required: [true, 'Customer phone number is required'],
        trim: true,
        maxlength: [20, 'Phone cannot exceed 20 characters']
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        default: null
      },
      notes: {
        type: String,
        trim: true,
        maxlength: [400, 'Notes cannot exceed 400 characters'],
        default: ''
      }
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'Order must contain at least one item'
      }
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount must be positive']
    },
    orderType: {
      type: String,
      enum: ['dine-in', 'takeaway', 'pre-order'],
      default: 'pre-order'
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'manual', 'pay-at-counter'],
      default: 'cash'
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'pending', 'paid', 'refunded'],
      default: 'pending'
    },
    orderStatus: {
      type: String,
      enum: ['received', 'preparing', 'ready', 'completed', 'cancelled'],
      default: 'received',
      index: true
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
