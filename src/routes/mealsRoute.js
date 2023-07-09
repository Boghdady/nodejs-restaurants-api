const express = require("express");

const {
  getMeal,
  createMeal,
  updateMeal,
  deleteMeal,
  uploadMealImages,
  resizeMealImages,
  getMeals
} = require("../services/mealsService");

const router = express.Router();

router
  .route("/")
  .get(getMeals)
  .post(uploadMealImages, resizeMealImages, createMeal);
router
  .route("/:id")
  .get(getMeal)
  .put(uploadMealImages, resizeMealImages, updateMeal)
  .delete(deleteMeal);

module.exports = router;
