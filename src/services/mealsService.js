const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const factory = require("./handlersFactory");
const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");
const Meals = require("../models/mealsModel");

exports.uploadMealImages = uploadMixOfImages([
  {
    name: "images",
    maxCount: 5
  }
]);

exports.resizeMealImages = asyncHandler(async (req, res, next) => {
  //2- Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `meal-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`src/uploads/meals/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );

    next();
  }
});

// @desc    Get list of meals
// @route   GET /api/v1/meals
// @access  Public
exports.getMeals = factory.getAll(Meals);

// @desc    Get specific meals by id
// @route   GET /api/v1/meals/:id
// @access  Public
exports.getMeal = factory.getOne(Meals);

// @desc    Create restaurant
// @route   POST  /api/v1/meals
// @access  Private
exports.createMeal = factory.createOne(Meals);

// @desc    Update specific restaurant
// @route   PUT /api/v1/meals/:id
// @access  Private
exports.updateMeal = factory.updateOne(Meals);

// @desc    Delete specific restaurant
// @route   DELETE /api/v1/meals/:id
// @access  Private
exports.deleteMeal = factory.deleteOne(Meals);
