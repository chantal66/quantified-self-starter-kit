// let pry = require('pryjs');
const $ = require('jquery');
const HTMLHelper = require('../helpers/htmlHelper');

const setUrl = 'http://whispering-earth-58532.herokuapp.com/';

class Food {
    static all() {
        return $.ajax({
            type: 'GET',
            url: setUrl + '/api/v1/foods'
        })
        .then( (response) => {
            response.forEach( (food) => {
                const foodRowTemplate = HTMLHelper.toHtml(food.name, food.calories);
                $('.all-foods').append(foodRowTemplate);
            })
        })
    }

    static addNewFood(event) {
        event.preventDefault();
        let foodName = $('.name-input').val();
        let foodCalorie = $('.calorie-input').val();

        Food.postNewFood(foodName, foodCalorie)
    }

    static postNewFood(foodName, foodCalorie){
        let data = { food: { name: foodName, calories: foodCalorie } }

        $.post(`${setUrl}api/v1/foods`, data)
            .then(() => {
              const foodRowTemplate = HTMLHelper.toHtml(foodName, foodCalorie);
              $('.all-foods tr:first').after(foodRowTemplate);
            })
            .catch(() => {
              console.log('The food was not persisted to the database!')
            });
    }

    static defineEventHandlers() {
      $('.form-food').on('submit', (event) => {
        Food.addNewFood(event);
      });
    }
}

Food.all();
Food.defineEventHandlers();
