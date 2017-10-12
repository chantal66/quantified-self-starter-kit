const $ = require('jquery');
const setUrl = require('../config/apiUrl').setUrl;
const HTMLHelper = require('../helpers/htmlHelper');

class AjaxRequests {
    static getFoods() {
        return $.ajax({
            type: 'GET',
            url: setUrl + '/api/v1/foods'
        })
    }

    static updateFoodName(id, foodName){
        $.ajax({
            method: "PUT",
            url: `${setUrl}api/v1/foods/${id}`,
            data: { food: { name: foodName } }
        })
    }

    static updateFoodCalorie(id, foodCalorie) {
        $.ajax({
            method: "PUT",
            url: `${setUrl}api/v1/foods/${id}`,
            data: { food: { calories: foodCalorie } }
        })
    }

    static postFoodMealJoinToServer(foodId, mealId) {
      $.ajax({
        method: 'POST',
        url: `${setUrl}/api/v1/meals/${mealId}/foods/${foodId}`
      });
    }

    static getMeals() {
      return $.get(setUrl + '/api/v1/meals');
    }

    static getFoodMealRelationships(mealId) {
      return $.get(`${setUrl}api/v1/meals/${mealId}/foods`);
    }
}

module.exports = AjaxRequests;
