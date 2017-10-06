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
                const foodRowTemplate = HTMLHelper.toHtml(food.name, food.calories, food.id);
                console.log(foodRowTemplate);
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
            .then((response) => {
              const id = response.id;
              const foodRowTemplate = HTMLHelper.toHtml(foodName, foodCalorie, id);
              $('.all-foods tr:first').after(foodRowTemplate);
            })
            .then(HTMLHelper.resetForm())
            .catch(() => {
              console.log('The food was not persisted to the database!')
            });
    }

    static delete(id) {
      return $.ajax({
        type: 'DELETE',
        url: setUrl + 'api/v1/foods/' + id,
      })
      .then((response) => {
        $(`tr.id-${id}`).remove();
      })
      .catch((error) => {
        console.log('There was an error. The error is:');
        console.log(error);
      })
    }


    static updateFood(id, foodName, foodCalories){
        $.ajax({
            method: "PUT",
            url: `${setUrl}/foods/${id}`,
            data: { food: { name: foodName, calories: foodCalories } }
        })
    }

    static defineEventHandlers() {
      $('.form-food').on('submit', (event) => {
        Food.addNewFood(event);
      });

      $('.all-foods').on('click', '.delete', (event) => {
        const id = event.target.dataset.id;
        Food.delete(id);
      });
    }
}

Food.all();
Food.defineEventHandlers();
