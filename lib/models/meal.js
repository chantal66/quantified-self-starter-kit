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

  static handleAddFoodsToMeals() {
    const meals = ['breakfast', 'lunch', 'dinner', 'snack'];
    meals.forEach((meal) => {
      $(`.add-foods-to-${meal}`).on('click', () => {
        Meal.addFoodsTo(meal);
        HTMLHelper.resetCheckbox();
        const calories =  Meal.calculateCalories(meal);
        HTMLHelper.caloriesToHTML(calories, meal);
        Meal.totalCalories(calories)
      });
    });
  }

  static calculateCalories(meal){
      const calorieNodes = $(`.${meal}`).find('td.calories');
      let sum = 0;
      calorieNodes.each((index, calorieNode) => {
          let calorieValue = parseInt(calorieNode.innerText);
          sum += calorieValue;
      });
      return sum
  }
}

module.exports = Meal;
