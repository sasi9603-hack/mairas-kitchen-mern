import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: [80, 'Customer name cannot exceed 80 characters']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      default: null
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters']
    },
    reservationDate: {
      type: String,
      required: [true, 'Reservation date is required'],
      trim: true
    },
    reservationTime: {
      type: String,
      required: [true, 'Reservation time is required'],
      trim: true
    },
    guestCount: {
      type: String,
      required: [true, 'Guest count is required'],
      default: '3 - 4 Guests'
    },
    seatingPreference: {
      type: String,
      enum: [
        'Open-Air Garden Lawn',
        'Indoor AC Dining',
        'Big Screen Match View',
        'No Preference'
      ],
      default: 'Open-Air Garden Lawn'
    },
    specialRequests: {
      type: String,
      trim: true,
      maxlength: [500, 'Special requests cannot exceed 500 characters'],
      default: ''
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
      index: true
    }
  },
  {
    timestamps: true
  }
);

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;
