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

  static handleSortByCalories() {
    const meals = ['breakfast', 'lunch', 'dinner', 'snack'];
    meals.forEach((mealName) => {
      $(`.calorie-header-${mealName}`).on('click', () =>{
        Meal.sortByCalories(mealName);
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
    Meal.setTotalRemainingCalories(totalCalories);
    })
  }

  static setTotalRemainingCalories(totalCalories) {
    const remainingCalories = 2000 - totalCalories;
    HTMLHelper.totalRemainingCaloriesToHtml(remainingCalories);
  }

  static setCalories(mealName){
    AjaxRequests.getMeals()
    // get the meal id
    .then((meals) => {
      const meal = meals.filter((meal, key) => {
        return (mealName === meal.name.toLowerCase());
      })
      return meal[0].id;
    })
    // get the foods that belong to that meal
    .then((mealId) => {
      return AjaxRequests.getFoodMealRelationships(mealId);
    })
    // calculate the sum of those foods' calories
    // put the total calories in the HTML
    .then((mealFoods) => {
      let totalCalories = mealFoods.foods.reduce((sum, food) => {
        return sum + food.calories;
      }, 0);
      HTMLHelper.caloriesToHTML(totalCalories, mealName);
        return totalCalories
    })
    // calculate the remaining calories
    // put the remaining calories in the HTML
    .then((calories)=> {
      const remainingCalories = Meal.remainingCalories(mealName, calories);
        HTMLHelper.remainingCaloriesToHtml(remainingCalories, mealName)
    })
  }

  static sortByCalories(mealName) {
    AjaxRequests.getMeals()
    .then((meals) => {
      // get the meal id
      const meal = meals.filter((meal, key) => {
        return (mealName === meal.name.toLowerCase());
      })
      return meal[0].id;
    })
    // get the foods that belong to that meal
    .then((mealId) => {
      return AjaxRequests.getFoodMealRelationships(mealId);
    })
    // sort the foods by calories
    .then((mealFoods) => {
      const foods = mealFoods.foods;
      const mealName = mealFoods.name.toLowerCase();
      const foodsArray = new Array();
      Object.keys(foods).map((key) => {
        foodsArray[key] = foods[key];
      });
      let sortedFoods = Meal.quickSort(foodsArray);

      // remove the unsorted foods from the DOM
       Meal.removeMealFoodsDisplay(mealName);

      if ($(`.${mealName}`).hasClass('unsorted')) {
        // if the data is not yet sorted, sort the data in descending order
        $(`.${mealName}`).removeClass('unsorted');
        $(`.${mealName}`).addClass('descending');
        sortedFoods = sortedFoods.reverse();
        HTMLHelper.insertFoodsIntoMeal(mealName, sortedFoods);
      } else if ($(`.${mealName}`).hasClass('descending')) {
        // if the data is already sorted in descending order, switch it to ascending order
        $(`.${mealName}`).removeClass('descending');
        $(`.${mealName}`).addClass('ascending');
        HTMLHelper.insertFoodsIntoMeal(mealName, sortedFoods);
      } else {
        $(`.${mealName}`).removeClass('ascending');
        $(`.${mealName}`).addClass('unsorted');
        HTMLHelper.insertFoodsIntoMeal(mealName, foods);
      }
    })
  }

  static quickSort(foods) {
   const foodsLength = foods.length;
   if (foodsLength <= 1 ) {
     // if the array only has one element, return the array
     return foods;
   } else if (!!foods.reduce((a, b) => { return (a.calories === b.calories) ? a : NaN })) {
     // if every element in the array has the same value, return the array
    return foods;
   }
   else {
     const pivotIndex = Math.floor(Math.random() * foodsLength);
     const pivotCalories = foods[pivotIndex].calories;
     let lesserThanOrEqualToPivot = new Array();
     let greaterThanPivot = new Array();
     foods.forEach((food) => {
      if (food.calories <= pivotCalories) {
        const newIndex = lesserThanOrEqualToPivot.length;
        lesserThanOrEqualToPivot[newIndex] = food;
      } else {
        const newIndex = greaterThanPivot.length
        greaterThanPivot[newIndex] = food;
      }
    });
    let sortedLesser = Meal.quickSort(lesserThanOrEqualToPivot);
    let sortedGreater = Meal.quickSort(greaterThanPivot);
    const sorted = sortedLesser.concat(sortedGreater);
    return sorted;
   }
  }

  static removeMealFoodsDisplay(mealName) {
    $(`.${mealName} .food`).remove()
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
