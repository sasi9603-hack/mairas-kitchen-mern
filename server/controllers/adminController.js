import Order from '../models/Order.js';
import Reservation from '../models/Reservation.js';
import MenuItem from '../models/MenuItem.js';
import User from '../models/User.js';

/**
 * @desc    Get comprehensive dashboard overview metrics
 * @route   GET /api/admin/overview
 * @access  Private / Admin, Staff
 */
export const getDashboardOverview = async (req, res, next) => {
  try {
    // Current date in YYYY-MM-DD
    const todayStr = new Date().toISOString().split('T')[0];

    const [
      totalOrders,
      activeOrdersCount,
      completedOrdersCount,
      cancelledOrdersCount,
      orderRevenueAgg,
      totalReservations,
      pendingReservations,
      confirmedReservations,
      todayReservationsCount,
      totalMenuItems,
      availableMenuItems,
      soldOutMenuItems,
      orderStatusDistribution,
      recentOrders,
      upcomingReservations
    ] = await Promise.all([
      // Total orders
      Order.countDocuments(),

      // Orders awaiting action (received or preparing)
      Order.countDocuments({ orderStatus: { $in: ['received', 'preparing'] } }),

      // Completed orders
      Order.countDocuments({ orderStatus: 'completed' }),

      // Cancelled orders
      Order.countDocuments({ orderStatus: 'cancelled' }),

      // Revenue aggregation: Total non-cancelled order value vs. verified collected cash
      Order.aggregate([
        { $match: { orderStatus: { $ne: 'cancelled' } } },
        {
          $group: {
            _id: null,
            totalOrderValue: { $sum: '$totalAmount' },
            collectedRevenue: {
              $sum: {
                $cond: [{ $eq: ['$paymentStatus', 'paid'] }, '$totalAmount', 0]
              }
            },
            unpaidOrderValue: {
              $sum: {
                $cond: [{ $ne: ['$paymentStatus', 'paid'] }, '$totalAmount', 0]
              }
            }
          }
        }
      ]),

      // Total reservations
      Reservation.countDocuments(),

      // Reservations awaiting confirmation
      Reservation.countDocuments({ status: 'pending' }),

      // Confirmed reservations
      Reservation.countDocuments({ status: 'confirmed' }),

      // Today's reservations (matching reservationDate string e.g. "2026-10-25")
      Reservation.countDocuments({
        reservationDate: todayStr,
        status: { $in: ['confirmed', 'pending'] }
      }),

      // Menu counts
      MenuItem.countDocuments(),
      MenuItem.countDocuments({ available: true }),
      MenuItem.countDocuments({ available: false }),

      // Order status distribution
      Order.aggregate([
        {
          $group: {
            _id: '$orderStatus',
            count: { $sum: 1 }
          }
        }
      ]),

      // 5 most recent orders
      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('customer totalAmount orderType paymentStatus orderStatus createdAt items'),

      // 5 upcoming reservations
      Reservation.find({ status: { $in: ['pending', 'confirmed'] } })
        .sort({ reservationDate: 1, reservationTime: 1 })
        .limit(5)
    ]);

    const revenueData = orderRevenueAgg[0] || {
      totalOrderValue: 0,
      collectedRevenue: 0,
      unpaidOrderValue: 0
    };

    res.status(200).json({
      success: true,
      data: {
        metrics: {
          // Flat aliases for direct dashboard card bindings
          totalOrders,
          activeOrders: activeOrdersCount,
          ordersReceived: await Order.countDocuments({ orderStatus: 'received' }),
          ordersPreparing: await Order.countDocuments({ orderStatus: 'preparing' }),
          ordersCompleted: completedOrdersCount,
          ordersCancelled: cancelledOrdersCount,
          totalRevenue: revenueData.totalOrderValue,
          paidRevenue: revenueData.collectedRevenue,
          unpaidRevenue: revenueData.unpaidOrderValue,
          totalReservations,
          pendingReservations,
          confirmedReservations,
          todayReservations: todayReservationsCount,
          totalDishes: totalMenuItems,
          availableDishes: availableMenuItems,
          soldOutDishes: soldOutMenuItems,

          // Nested structure
          orders: {
            total: totalOrders,
            active: activeOrdersCount,
            completed: completedOrdersCount,
            cancelled: cancelledOrdersCount
          },
          revenue: {
            totalOrderValue: revenueData.totalOrderValue,
            collectedRevenue: revenueData.collectedRevenue, // actual cash confirmed
            unpaidOrderValue: revenueData.unpaidOrderValue,
            currency: '₹'
          },
          reservations: {
            total: totalReservations,
            pending: pendingReservations,
            confirmed: confirmedReservations,
            today: todayReservationsCount
          },
          menu: {
            total: totalMenuItems,
            available: availableMenuItems,
            soldOut: soldOutMenuItems
          }
        },
        distribution: orderStatusDistribution.map((d) => ({
          status: d._id,
          count: d.count
        })),
        recentOrders: recentOrders.map((o) => ({
          _id: o._id,
          id: o._id,
          orderNumber: `MK-${String(o._id).slice(-6).toUpperCase()}`,
          customerName: o.customer.name,
          customerPhone: o.customer.phone,
          phone: o.customer.phone,
          items: o.items,
          itemsCount: o.items.reduce((sum, item) => sum + item.quantity, 0),
          totalAmount: o.totalAmount,
          orderType: o.orderType,
          paymentStatus: o.paymentStatus,
          orderStatus: o.orderStatus,
          createdAt: o.createdAt
        })),
        upcomingReservations: upcomingReservations.map((r) => ({
          _id: r._id,
          id: r._id,
          bookingReference: `RES-${String(r._id).slice(-6).toUpperCase()}`,
          bookingRef: `RES-${String(r._id).slice(-6).toUpperCase()}`,
          customerName: r.customerName,
          customerPhone: r.phone,
          phone: r.phone,
          reservationDate: r.reservationDate,
          reservationTime: r.reservationTime,
          guestCount: r.guestCount,
          seatingPreference: r.seatingPreference,
          status: r.status,
          createdAt: r.createdAt
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get aggregated customer list from orders and reservations
 * @route   GET /api/admin/customers
 * @access  Private / Admin, Staff
 */
export const getCustomers = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10)));

    // Aggregate customers based on Order data
    const orderCustomerAgg = await Order.aggregate([
      {
        $group: {
          _id: '$customer.phone',
          name: { $first: '$customer.name' },
          phone: { $first: '$customer.phone' },
          email: { $first: '$customer.email' },
          ordersCount: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' },
          lastOrderDate: { $max: '$createdAt' }
        }
      }
    ]);

    // Aggregate customers based on Reservation data
    const reservationCustomerAgg = await Reservation.aggregate([
      {
        $group: {
          _id: '$phone',
          name: { $first: '$customerName' },
          phone: { $first: '$phone' },
          email: { $first: '$email' },
          reservationsCount: { $sum: 1 },
          lastReservationDate: { $max: '$createdAt' }
        }
      }
    ]);

    // Merge customer data by normalized phone
    const customerMap = new Map();

    for (const oc of orderCustomerAgg) {
      if (!oc.phone) continue;
      const cleanPhone = oc.phone.replace(/[^0-9]/g, '');
      customerMap.set(cleanPhone, {
        id: cleanPhone,
        name: oc.name || 'Guest',
        phone: oc.phone,
        email: oc.email || '—',
        orderCount: oc.ordersCount || 0,
        ordersCount: oc.ordersCount || 0,
        reservationCount: 0,
        reservationsCount: 0,
        totalSpent: oc.totalSpent || 0,
        lastActive: oc.lastOrderDate,
        lastActivity: oc.lastOrderDate
      });
    }

    for (const rc of reservationCustomerAgg) {
      if (!rc.phone) continue;
      const cleanPhone = rc.phone.replace(/[^0-9]/g, '');
      if (customerMap.has(cleanPhone)) {
        const existing = customerMap.get(cleanPhone);
        existing.reservationCount = rc.reservationsCount;
        existing.reservationsCount = rc.reservationsCount;
        if (new Date(rc.lastReservationDate) > new Date(existing.lastActivity)) {
          existing.lastActive = rc.lastReservationDate;
          existing.lastActivity = rc.lastReservationDate;
        }
        if (existing.email === '—' && rc.email) {
          existing.email = rc.email;
        }
      } else {
        customerMap.set(cleanPhone, {
          id: cleanPhone,
          name: rc.name || 'Guest',
          phone: rc.phone,
          email: rc.email || '—',
          orderCount: 0,
          ordersCount: 0,
          reservationCount: rc.reservationsCount || 0,
          reservationsCount: rc.reservationsCount || 0,
          totalSpent: 0,
          lastActive: rc.lastReservationDate,
          lastActivity: rc.lastReservationDate
        });
      }
    }

    let customers = Array.from(customerMap.values());

    // Apply search filter if query is provided
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      const cleanQ = q.replace(/[^0-9]/g, '');
      customers = customers.filter((c) => {
        const cleanPhone = (c.phone || '').replace(/[^0-9]/g, '');
        return (
          c.name.toLowerCase().includes(q) ||
          (c.phone && c.phone.toLowerCase().includes(q)) ||
          (cleanQ && cleanPhone.includes(cleanQ)) ||
          (c.email && c.email.toLowerCase().includes(q))
        );
      });
    }

    // Sort by last activity descending
    customers.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));

    const totalCount = customers.length;
    const totalPages = Math.ceil(totalCount / limitNum) || 1;
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedCustomers = customers.slice(startIndex, startIndex + limitNum);

    res.status(200).json({
      success: true,
      count: totalCount,
      totalPages,
      currentPage: pageNum,
      data: paginatedCustomers
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get order and reservation history for a specific customer
 * @route   GET /api/admin/customers/:phone/history
 * @access  Private / Admin, Staff
 */
export const getCustomerHistory = async (req, res, next) => {
  try {
    const { phone } = req.params;
    const cleanPhone = phone.replace(/[^0-9]/g, '');

    // Match exact or contains regex
    const phoneRegex = new RegExp(cleanPhone.slice(-10), 'i');

    const [orders, reservations] = await Promise.all([
      Order.find({ 'customer.phone': phoneRegex }).sort({ createdAt: -1 }),
      Reservation.find({ phone: phoneRegex }).sort({ createdAt: -1 })
    ]);

    res.status(200).json({
      success: true,
      data: {
        phone,
        orders,
        reservations
      }
    });
  } catch (error) {
    next(error);
  }
};
