import Settings from '../models/Settings.js';

/**
 * @desc    Get current restaurant operational settings
 * @route   GET /api/settings
 * @access  Public
 */
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();

    // Auto-initialize if no settings record exists yet
    if (!settings) {
      settings = await Settings.create({});
    }

    res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update restaurant operational settings
 * @route   PUT /api/settings
 * @access  Private / Admin
 */
export const updateSettings = async (req, res, next) => {
  try {
    const {
      restaurantName,
      tagline,
      address,
      phone,
      whatsapp,
      timings,
      instagram,
      googleMaps,
      announcement,
      allowReservations,
      allowPreOrders
    } = req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings({});
    }

    if (restaurantName !== undefined) settings.restaurantName = restaurantName.trim();
    if (tagline !== undefined) settings.tagline = tagline.trim();
    if (address !== undefined) settings.address = address.trim();
    if (phone !== undefined) settings.phone = phone.trim();
    if (whatsapp !== undefined) settings.whatsapp = whatsapp.trim();
    if (timings !== undefined) settings.timings = timings.trim();
    if (instagram !== undefined) settings.instagram = instagram.trim();
    if (googleMaps !== undefined) settings.googleMaps = googleMaps.trim();
    if (announcement !== undefined) settings.announcement = announcement.trim();
    if (allowReservations !== undefined) settings.allowReservations = Boolean(allowReservations);
    if (allowPreOrders !== undefined) settings.allowPreOrders = Boolean(allowPreOrders);

    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Restaurant settings updated successfully',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};
