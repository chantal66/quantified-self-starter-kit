const $ = require('jquery');
const AjaxRequests = require('./ajaxHelper');

class HTMLHelper {
    static toHtml(args){
      const foodName = args["foodName"];
      const foodCalorie = args["foodCalorie"];
      const id = args["id"];
      const use_checkbox = args["use_checkbox"];
      const checkbox = use_checkbox === true ? '<input type="checkbox" />' : '';
        return `
                <tr class="id-${id}">
                  <td>${checkbox}</td>
                  <td id="foodName" data-id="${id}" contenteditable='true'>${foodName}</td>
                  <td class="calories" id="foodCalorie" data-id="${id}" contenteditable='true' >${foodCalorie}</td>
                  <td><button class="delete" data-id="${id}">Delete</button></td>
                </tr>
               `;
    }

    static resetForm() {
        $(".name-input").val("");
        $(".calorie-input").val("");
    }

    static caloriesToHTML(calories, mealName){
        $(`.${mealName} td.sum`).text(calories);
    }

    static remainingCaloriesToHtml(calories, mealName){
        $(`.${mealName} td.remaining-calories`).text(calories);
    }

    static totalCaloriesToHTML(totalCalories) {
        $(`td.total-calories`).text(totalCalories);
    }

    static resetCheckbox(){
        $('input:checked').prop('checked', false);
    }

    static setMealIdsInHTML(meals) {
      meals.forEach((meal) => {
        const mealId = meal.id;
        const mealName = meal.name.toLowerCase();
        $(`.${mealName}`).attr('data-id', mealId);
      })
    }

    static insertFoodMealRelationsInHTML() {
      const mealNames = ['breakfast', 'lunch', 'dinner', 'snack'];
      mealNames.forEach((mealName) => {
        const mealId = $(`.${mealName}`)[0].dataset.id;
        AjaxRequests.getFoodMealRelationships(mealId)
        .then((meal) => {
          meal.foods.forEach((food) => {
            const foodName = food.name;
            const foodCalorie = food.calories;
            const foodId = food.id;
            const foodRowTemplate = HTMLHelper.toHtml({foodName: foodName, foodCalorie: foodCalorie, id: foodId, checkbox: false});
            $(`.${mealName} tr:first`).after(foodRowTemplate);
          });
        });
      });
    }


}

module.exports = HTMLHelper;
