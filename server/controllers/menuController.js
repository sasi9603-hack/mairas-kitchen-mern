import MenuItem from '../models/MenuItem.js';

/**
 * @desc    Get all menu items with optional category, diet, and search filter
 * @route   GET /api/menu
 * @access  Public
 */
export const getMenuItems = async (req, res, next) => {
  try {
    const { category, diet, q, available, includeUnavailable } = req.query;
    const filter = {};

    if (available === 'false') {
      filter.available = false;
    } else if (available === 'all' || includeUnavailable === 'true') {
      // Admin request: show all items regardless of availability
    } else {
      // Default: only return available dishes
      filter.available = true;
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (diet && diet !== 'all') {
      filter.diet = diet;
    }

    if (q && q.trim()) {
      filter.$or = [
        { name: { $regex: q.trim(), $options: 'i' } },
        { description: { $regex: q.trim(), $options: 'i' } },
        { ingredients: { $regex: q.trim(), $options: 'i' } }
      ];
    }

    const items = await MenuItem.find(filter).sort({ category: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single menu item by ID
 * @route   GET /api/menu/:id
 * @access  Public
 */
export const getMenuItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let item;

    // Check if ID is a valid MongoDB ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      item = await MenuItem.findById(id);
    } else {
      // Allow searching by itemId (e.g. 'biry-01') or exact name
      item = await MenuItem.findOne({
        $or: [
          { itemId: id },
          { name: { $regex: new RegExp(`^${id}$`, 'i') } }
        ]
      });
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Menu item not found with identifier: ${id}`
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new menu item
 * @route   POST /api/menu
 * @access  Private / Admin
 */
export const createMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a menu item
 * @route   PUT /api/menu/:id
 * @access  Private / Admin
 */
export const updateMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: item
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a menu item (or mark unavailable)
 * @route   DELETE /api/menu/:id
 * @access  Private / Admin
 */
export const deleteMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Menu item removed successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle dish availability (available <-> sold out)
 * @route   PATCH /api/menu/:id/availability
 * @access  Private / Admin, Staff
 */
export const toggleMenuItemAvailability = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    item.available = req.body.available !== undefined ? Boolean(req.body.available) : !item.available;
    await item.save();

    res.status(200).json({
      success: true,
      message: `Dish '${item.name}' marked as ${item.available ? 'Available' : 'Sold Out'}`,
      data: item
    });
  } catch (error) {
    next(error);
  }
};
