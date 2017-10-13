const $ = require('jquery');
const HTMLHelper = require('../helpers/htmlHelper');
const setUrl = require('../config/apiUrl').setUrl;
const AjaxRequests = require('../helpers/ajaxHelper');

class Meal {
  static addFoodsTo(mealName) {
    const foodRows = $('.all-foods').find('tr');
    foodRows.each((key, foodRow) => {
      // ignore the row of header labels
      if (key > 0) {
        // selected is a boolean indicating whether the checkbox is checked
        let selected = foodRow.children["0"].children["0"].checked;

        if (selected === true) {
          let foodName = foodRow.children["1"].innerText;
          let foodCalorie = foodRow.children["2"].innerText;
          let foodId = foodRow.children["1"].dataset.id;
          let mealId = $(`.${mealName}`)[0].dataset.id;

          // post the new food/meal relationship to the server
          AjaxRequests.postFoodMealJoinToServer(foodId, mealId);

          // add the food to the meal which corresponds to the clicked meal button
          const foodRowTemplate = HTMLHelper.toHtml({foodName: foodName, foodCalorie: foodCalorie, id: foodId, checkbox: false});
          $(`.${mealName} tr:first`).after(foodRowTemplate);
        }
      }
    });

  }

  static handleAddFoodsToMeals() {
    const meals = ['breakfast', 'lunch', 'dinner', 'snack'];
    meals.forEach((mealName) => {
      $(`.add-foods-to-${mealName}`).on('click', () => {
        Meal.addFoodsTo(mealName);
        HTMLHelper.resetCheckbox();
        const calories =  Meal.calculateCalories(mealName);
        HTMLHelper.caloriesToHTML(calories, mealName);
      });
    });
  }

  static calculateCalories(mealName){
      const calorieNodes = $(`.${mealName}`).find('td.calories');
      let sum = 0;
      calorieNodes.each((index, calorieNode) => {
          let calorieValue = parseInt(calorieNode.innerText);
          sum += calorieValue;
      });
      return sum
  }

  static populateMealPage() {
    AjaxRequests.getMeals()
    .then((meals) => {
      HTMLHelper.setMealIdsInHTML(meals);
      HTMLHelper.insertFoodMealRelationsInHTML();
      meals.forEach((meal) => {
       let calories = meal.foods.reduce((sum, food) => {
         return sum + food.calories;
       }, 0)
       const mealName = meal.name.toLowerCase();
       HTMLHelper.caloriesToHTML(calories, mealName);
      })
    });
  }
}

module.exports = Meal;
