const $ = require('jquery');

class Meal {
  static defineEventHandlers() {
    $('.all-foods').on('click', 'input', (event) => {
      if ($(event.target).is(':checked')) {
        // add the selected food to a meal
      }
    })
  }
}

Meal.defineEventHandlers();
