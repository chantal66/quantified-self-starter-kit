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
        Meal.setCalories(mealName);
        Meal.setTotalCalories();
      });
    });
  }

  static setTotalCalories() {
    AjaxRequests.getMeals()
    .then((meals) => {
      const totalCalories = meals.reduce((totalSum, meal) => {
        return totalSum + meal.foods.reduce((mealSum, food) => {
          return mealSum + food.calories;
        }, 0);
      }, 0);
    HTMLHelper.totalCaloriesToHTML(totalCalories);
    })
  }

  static setCalories(mealName){
    AjaxRequests.getMeals()
    .then((meals) => {
      const meal = meals.filter((meal, key) => {
        return (mealName === meal.name.toLowerCase());
      })
      return meal[0].id;
    })
    .then((mealId) => {
      return AjaxRequests.getFoodMealRelationships(mealId);
    })
    .then((mealFoods) => {
      let calories = mealFoods.foods.reduce((sum, food) => {
        return sum + food.calories;
      }, 0);
      HTMLHelper.caloriesToHTML(calories, mealName);
        return calories
    })
    .then((calories)=> {
      const remainingCalories = Meal.remainingCalories(mealName, calories);
        HTMLHelper.remainingCaloriesToHtml(remainingCalories, mealName)
    })
  }

  static populateMealPage() {
    AjaxRequests.getMeals()
    .then((meals) => {
      HTMLHelper.setMealIdsInHTML(meals);
      HTMLHelper.insertFoodMealRelationsInHTML();
      meals.forEach((meal) => {
        const mealName = meal.name.toLowerCase();
        Meal.setCalories(mealName);
      })
      Meal.setTotalCalories();
    });
  }

  static remainingCalories(mealName, calories) {
      const mealNums = {
          "breakfast": 400,
          "snack": 200,
          "lunch": 600,
          "dinner": 800
      };
      const remainingCalories = mealNums[ mealName ] - calories
      return remainingCalories
  }


}

module.exports = Meal;
