const express = require("express");

const {
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  uploadRestaurantImage,
  resizeImage,
  getRestaurants
} = require("../services/restaurantsService");

const router = express.Router();

router
  .route("/")
  .get(getRestaurants)
  .post(uploadRestaurantImage, resizeImage, createRestaurant);
router
  .route("/:id")
  .get(getRestaurant)
  .put(uploadRestaurantImage, resizeImage, updateRestaurant)
  .delete(deleteRestaurant);

module.exports = router;
