import Reservation from '../models/Reservation.js';

/**
 * @desc    Create a new table reservation
 * @route   POST /api/reservations
 * @access  Public
 */
export const createReservation = async (req, res, next) => {
  try {
    const {
      customerName,
      email,
      phone,
      reservationDate,
      reservationTime,
      guestCount,
      seatingPreference,
      specialRequests
    } = req.body;

    // Create reservation in MongoDB
    const reservation = await Reservation.create({
      customerName,
      email: email || null,
      phone,
      reservationDate,
      reservationTime,
      guestCount: guestCount || '3 - 4 Guests',
      seatingPreference: seatingPreference || 'Open-Air Garden Lawn',
      specialRequests: specialRequests || '',
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Table reservation recorded successfully',
      data: {
        _id: reservation._id,
        id: reservation._id,
        bookingReference: `RES-${String(reservation._id).slice(-6).toUpperCase()}`,
        bookingRef: `RES-${String(reservation._id).slice(-6).toUpperCase()}`,
        customerName: reservation.customerName,
        phone: reservation.phone,
        reservationDate: reservation.reservationDate,
        reservationTime: reservation.reservationTime,
        guestCount: reservation.guestCount,
        seatingPreference: reservation.seatingPreference,
        status: reservation.status,
        createdAt: reservation.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all reservations with pagination, search, status, and date filters
 * @route   GET /api/reservations
 * @access  Private / Admin, Staff
 */
export const getReservations = async (req, res, next) => {
  try {
    const { status, search, date, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10)));

    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (date) {
      filter.reservationDate = date;
    }

    if (search && search.trim()) {
      const q = search.trim();
      const regex = new RegExp(q, 'i');

      const orConditions = [
        { customerName: regex },
        { phone: regex },
        { email: regex }
      ];

      const cleanHex = q.replace(/^RES-/i, '');
      if (cleanHex.length === 24 && cleanHex.match(/^[0-9a-fA-F]{24}$/)) {
        orConditions.push({ _id: cleanHex });
      }

      filter.$or = orConditions;
    }

    const totalCount = await Reservation.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limitNum) || 1;

    const reservations = await Reservation.find(filter)
      .sort({ reservationDate: -1, reservationTime: -1, createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const formatted = reservations.map((r) => ({
      ...r.toObject(),
      bookingRef: `RES-${String(r._id).slice(-6).toUpperCase()}`
    }));

    res.status(200).json({
      success: true,
      count: totalCount,
      totalPages,
      currentPage: pageNum,
      limit: limitNum,
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update reservation status with transition checks
 * @route   PATCH /api/reservations/:id/status
 * @access  Private / Admin, Staff
 */
export const updateReservationStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;
    const allowed = ['pending', 'confirmed', 'completed', 'cancelled'];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid reservation status '${status}'. Allowed values: ${allowed.join(', ')}`
      });
    }

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    // Business rule: completed and cancelled are terminal
    if (reservation.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Completed reservations cannot have their status altered'
      });
    }

    if (reservation.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cancelled reservations cannot be re-opened'
      });
    }

    reservation.status = status;
    if (note && note.trim()) {
      reservation.specialRequests = reservation.specialRequests
        ? `${reservation.specialRequests} | [Admin Note]: ${note.trim()}`
        : `[Admin Note]: ${note.trim()}`;
    }

    await reservation.save();

    res.status(200).json({
      success: true,
      message: `Reservation status updated to '${status}'`,
      data: {
        ...reservation.toObject(),
        bookingRef: `RES-${String(reservation._id).slice(-6).toUpperCase()}`
      }
    });
  } catch (error) {
    next(error);
  }
};
