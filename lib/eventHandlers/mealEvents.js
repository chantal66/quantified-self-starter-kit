let $ = require('jquery');
const Meal = require('../models/meal');

$(document).ready(function() {
  Meal.handleAddFoodsToMeals();
  Meal.handleSortByCalories();
  Meal.populateMealPage();
})
