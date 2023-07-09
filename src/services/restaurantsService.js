const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const factory = require("./handlersFactory");
const {
  uploadSingleImage,
  uploadMixOfImages
} = require("../middlewares/uploadImageMiddleware");
const Restaurants = require("../models/restaurantsModel");

exports.uploadRestaurantImages = uploadMixOfImages([
  {
    name: "logo",
    maxCount: 1
  },
  {
    name: "images",
    maxCount: 5
  }
]);

exports.resizeRestaurantImages = asyncHandler(async (req, res, next) => {
  // console.log(req.files);
  //1- Image processing for imageCover
  if (req.files.logo) {
    const logoFileName = `product-${uuidv4()}-${Date.now()}-logo.jpeg`;

    await sharp(req.files.logo[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`src/uploads/restaurants/${logoFileName}`);

    // Save image into our db
    req.body.logo = logoFileName;
  }
  //2- Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `restaurant-${uuidv4()}-${Date.now()}-${index +
          1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`src/uploads/restaurants/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );

    next();
  }
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
