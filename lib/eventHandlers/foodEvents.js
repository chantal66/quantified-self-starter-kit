let $ = require('jquery');
const Food = require('../models/food');

$(document).ready( function () {
    Food.all();
    Food.newFoodEvent();
    Food.deleteEvent();
    Food.foodFilter();
    Food.updateFoodEvent();
    Food.updateCalorieEvent();
    $("#searchInput").on('keyup', Food.foodFilter);
    $(".form-food").on('submit', Food.addNewFood);
});
