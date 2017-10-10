const $ = require('jquery');
const HTMLHelper = require('../helpers/htmlHelper');

class Meal {
  static addFoodsTo(meal) {
    const foodRows = $('.all-foods').find('tr');
    foodRows.each((index, foodRow) => {
      // ignore the row of header labels
      if (index > 0) {
        // selected is a boolean indicating whether the checkbox is checked
        let selected = foodRow.children["0"].children["0"].checked;
        let foodName = foodRow.children["1"].innerText;
        let foodCalorie = foodRow.children["2"].innerText;
        let id = foodRow.children["1"].dataset.id;

        if (selected === true) {
          // add the food to the meal which corresponds to the clicked meal button
          const foodRowTemplate = HTMLHelper.toHtml({foodName: foodName, foodCalorie: foodCalorie, id: id, checkbox: false});
          $(`.${meal} tr:first`).after(foodRowTemplate);
        }
      }
    });
  }

  static defineEventHandlers() {
    $('.add-foods-to-breakfast').on('click', () => {
      const meal = 'breakfast';
      Meal.addFoodsTo(meal);
    });

    $('.add-foods-to-lunch').on('click', () => {
      const meal = 'lunch';
      Meal.addFoodsTo(meal);
    });

    $('.add-foods-to-dinner').on('click', () => {
      const meal = 'dinner';
      Meal.addFoodsTo(meal);
    });

    $('.add-foods-to-snack').on('click', () => {
      const meal = 'snack';
      Meal.addFoodsTo(meal);
    });
  }
}

Meal.defineEventHandlers();
