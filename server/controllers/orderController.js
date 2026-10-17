import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';

/**
 * @desc    Create a new customer order with server-calculated totals
 * @route   POST /api/orders
 * @access  Public
 */
export const createOrder = async (req, res, next) => {
  try {
    const { customer, items, orderType, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });
    }

    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and phone number are required'
      });
    }

    // Verify and fetch each item's actual authoritative price from MongoDB
    const verifiedItems = [];
    let calculatedTotal = 0;

    for (const rawItem of items) {
      const qty = parseInt(rawItem.quantity || rawItem.qty, 10);
      if (isNaN(qty) || qty <= 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid quantity for item: ${rawItem.name || rawItem.menuItemId}`
        });
      }

      // Look up menu item in MongoDB by MongoDB ObjectId, by itemId, or by name
      let dbItem = null;
      const possibleId = rawItem.menuItem || rawItem.id || rawItem.menuItemId || rawItem.itemId;
      if (possibleId && String(possibleId).match(/^[0-9a-fA-F]{24}$/)) {
        dbItem = await MenuItem.findById(possibleId);
      }
      if (!dbItem && possibleId) {
        dbItem = await MenuItem.findOne({ itemId: possibleId });
      }
      if (!dbItem && rawItem.name) {
        dbItem = await MenuItem.findOne({
          name: { $regex: new RegExp(`^${rawItem.name.trim()}$`, 'i') }
        });
      }

      if (!dbItem) {
        return res.status(400).json({
          success: false,
          message: `Menu item '${rawItem.name || rawItem.menuItemId || rawItem.itemId}' does not exist or is no longer available`
        });
      }

      const itemTotal = dbItem.price * qty;
      calculatedTotal += itemTotal;

      verifiedItems.push({
        menuItem: dbItem._id,
        menuItemId: rawItem.id || rawItem.menuItemId || rawItem.itemId || String(dbItem._id),
        name: dbItem.name,
        quantity: qty,
        price: dbItem.price // ALWAYS use DB price, never client price
      });
    }

    // Save order in MongoDB
    const order = await Order.create({
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        email: customer.email ? customer.email.trim() : null,
        notes: customer.notes ? customer.notes.trim() : ''
      },
      items: verifiedItems,
      totalAmount: calculatedTotal,
      orderType: orderType || 'pre-order',
      paymentMethod: paymentMethod === 'cash' ? 'cash' : 'manual',
      paymentStatus: 'pending', // Never mark as paid automatically
      orderStatus: 'received'
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        _id: order._id,
        id: order._id,
        orderNumber: `MK-${String(order._id).slice(-6).toUpperCase()}`,
        customer: order.customer,
        items: order.items,
        totalAmount: order.totalAmount,
        orderType: order.orderType,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all orders with pagination, status filters, search, and date filters
 * @route   GET /api/orders
 * @access  Private / Admin, Staff
 */
export const getOrders = async (req, res, next) => {
  try {
    const { status, paymentStatus, orderType, search, date, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, Math.min(50, parseInt(limit, 10)));

    const filter = {};

    if (status && status !== 'all') {
      filter.orderStatus = status;
    }

    if (paymentStatus && paymentStatus !== 'all') {
      filter.paymentStatus = paymentStatus;
    }

    if (orderType && orderType !== 'all') {
      filter.orderType = orderType;
    }

    if (date) {
      const startOfDay = new Date(`${date}T00:00:00.000Z`);
      const endOfDay = new Date(`${date}T23:59:59.999Z`);
      filter.createdAt = { $gte: startOfDay, $lte: endOfDay };
    }

    if (search && search.trim()) {
      const q = search.trim();
      const regex = new RegExp(q, 'i');

      const orConditions = [
        { 'customer.name': regex },
        { 'customer.phone': regex }
      ];

      // If search looks like hex or orderNumber suffix
      const cleanHex = q.replace(/^MK-/i, '');
      if (cleanHex.match(/^[0-9a-fA-F]{1,24}$/)) {
        if (cleanHex.length === 24) {
          orConditions.push({ _id: cleanHex });
        }
      }

      filter.$or = orConditions;
    }

    const totalCount = await Order.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limitNum) || 1;

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const formattedOrders = orders.map((o) => ({
      ...o.toObject(),
      orderNumber: `MK-${String(o._id).slice(-6).toUpperCase()}`
    }));

    res.status(200).json({
      success: true,
      count: totalCount,
      totalPages,
      currentPage: pageNum,
      limit: limitNum,
      data: formattedOrders
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Public / Admin
 */
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ...order.toObject(),
        orderNumber: `MK-${String(order._id).slice(-6).toUpperCase()}`
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update order status with strict transition validation
 * @route   PATCH /api/orders/:id/status
 * @access  Private / Admin, Staff
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;
    const allowedStatuses = ['received', 'preparing', 'ready', 'completed', 'cancelled'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status: '${status}'. Allowed values: ${allowedStatuses.join(', ')}`
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Business rule: terminal states cannot transition further
    if (order.orderStatus === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Completed orders cannot be transitioned to another status'
      });
    }

    if (order.orderStatus === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Cancelled orders cannot be reopened'
      });
    }

    // Validate forward flow or cancellation
    const validTransitions = {
      received: ['preparing', 'cancelled'],
      preparing: ['ready', 'cancelled'],
      ready: ['completed', 'cancelled']
    };

    if (!validTransitions[order.orderStatus]?.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status transition from '${order.orderStatus}' to '${status}'`
      });
    }

    order.orderStatus = status;
    if (note && note.trim()) {
      order.customer.notes = order.customer.notes
        ? `${order.customer.notes} | [Status Note]: ${note.trim()}`
        : `[Status Note]: ${note.trim()}`;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated to '${status}'`,
      data: {
        ...order.toObject(),
        orderNumber: `MK-${String(order._id).slice(-6).toUpperCase()}`
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update order payment status (manual cash receipt confirmation)
 * @route   PATCH /api/orders/:id/payment
 * @access  Private / Admin, Staff
 */
export const updateOrderPayment = async (req, res, next) => {
  try {
    const { paymentStatus } = req.body;
    const allowed = ['unpaid', 'pending', 'paid', 'refunded'];

    if (!allowed.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid payment status. Allowed values: ${allowed.join(', ')}`
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    res.status(200).json({
      success: true,
      message: `Payment status updated to '${paymentStatus}'`,
      data: {
        ...order.toObject(),
        orderNumber: `MK-${String(order._id).slice(-6).toUpperCase()}`
      }
    });
  } catch (error) {
    next(error);
  }
};
