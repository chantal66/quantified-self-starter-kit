let $ = require('jquery');
const Food = require('./food');

$(document).ready( function () {
    Food.all();
    $("#searchInput").on('keyup', Food.foodFilter);
    $(".form-food").on('submit', Food.addNewFood);

});