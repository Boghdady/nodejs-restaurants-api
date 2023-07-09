const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const Restaurants = require("../models/restaurantsModel");

// Upload single image
exports.uploadRestaurantImage = uploadSingleImage("image");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `restaurant-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`src/uploads/restaurants/${filename}`);

  // Save image into our db
  req.body.image = filename;

  next();
});

// @desc    Get list of restaurants
// @route   GET /api/v1/restaurants
// @access  Public
exports.getRestaurants = factory.getAll(Restaurants);

// @desc    Get specific restaurant by id
// @route   GET /api/v1/restaurants/:id
// @access  Public
exports.getRestaurant = factory.getOne(Restaurants);

// @desc    Create restaurant
// @route   POST  /api/v1/restaurants
// @access  Private
exports.createRestaurant = factory.createOne(Restaurants);

// @desc    Update specific restaurant
// @route   PUT /api/v1/restaurants/:id
// @access  Private
exports.updateRestaurant = factory.updateOne(Restaurants);

// @desc    Delete specific restaurant
// @route   DELETE /api/v1/restaurants/:id
// @access  Private
exports.deleteRestaurant = factory.deleteOne(Restaurants);
