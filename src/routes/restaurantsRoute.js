const express = require("express");

const {
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  uploadRestaurantImages,
  resizeRestaurantImages,
  getRestaurants
} = require("../services/restaurantsService");

const router = express.Router();

router
  .route("/")
  .get(getRestaurants)
  .post(uploadRestaurantImages, resizeRestaurantImages, createRestaurant);
router
  .route("/:id")
  .get(getRestaurant)
  .put(uploadRestaurantImages, resizeRestaurantImages, updateRestaurant)
  .delete(deleteRestaurant);

module.exports = router;
