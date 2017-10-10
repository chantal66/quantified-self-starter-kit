// let pry = require('pryjs');
const $ = require('jquery');
const HTMLHelper = require('../helpers/htmlHelper');

const setUrl = 'https://whispering-earth-58532.herokuapp.com';

class Food {
    static all() {
        return $.ajax({
            type: 'GET',
            url: setUrl + '/api/v1/foods'
        })
        .then( (response) => {
            if (document.title === "Quantified Self - Manage Foods") {var checkbox = false}
            if (document.title === "Quantified Self - Diary") {var checkbox = true}
            response.forEach( (food) => {
                const foodRowTemplate = HTMLHelper.toHtml({foodName: food.name, foodCalorie: food.calories, id: food.id, checkbox: checkbox});
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
              const foodRowTemplate = HTMLHelper.toHtml({foodName: foodName, foodCalorie: foodCalorie, id: id, checkbox: false});
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

    static defineEventHandlers() {
      $('.form-food').on('submit', (event) => {
        Food.addNewFood(event);
      });

      $('.all-foods').on('click', '.delete', (event) => {
        const id = event.target.dataset.id;
        Food.delete(id);
      });

      $('.all-foods').on('keyup', '#foodName', (event) => {
        const changedFoodName = event.target.innerText;
        const id = event.target.dataset.id;
        Food.updateFoodName(id, changedFoodName);
      });

      $('.all-foods').on('keyup', '#foodCalorie', (event) => {
        const changedFoodCalorie = event.target.innerText;
        const id = event.target.dataset.id;
        Food.updateFoodCalorie(id, changedFoodCalorie);
      });
    }
}

Food.all();
Food.defineEventHandlers();
