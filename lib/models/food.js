// let pry = require('pryjs');
const $ = require('jquery');
const HTMLHelper = require('../helpers/htmlHelper');

const setUrl = 'http://whispering-earth-58532.herokuapp.com/';

class Food {
    constructor(food) {
        this.id = food.id;
        this.name = food.name;
        this.calories = food.calories
    }

    static all() {
        return $.ajax({
            type: 'GET',
            url: setUrl + '/api/v1/foods'
        })
        .then( (response) => {
            response.forEach( (food) => {
                const foodRowTemplate = `<tr>
                                           <td>${food.name}</td>
                                           <td>${food.calories}</td>
                                           <td><button class="delete">Delete</button></td>
                                        </tr>`;
                $('.all-foods').append(foodRowTemplate);
            })
        })
        .then(Food.addFoodToList)
    }

    static addFoodToList(foods){
        foods.forEach( (food) => {
            $('.all-foods').prepend(HTMLHelper.toHtml(food))
        })
    }

    static addNewFood() {
        event.preventDefault();
        let foodName = $('.name-input').val();
        let foodCalorie = $('.calorie-input').val();

        Food.postNewFood(foodName, foodCalorie)
    }

    // static makeNewFood(foodName, foodCalorie){
        //in here i will handle errors for empty strings
        // in the form

        // Food.postNewFood(foodName, foodCalorie)
    // }

    static postNewFood(foodName, foodCalorie){
        let data = { food: { name: foodName, calories: foodCalorie } }

        $.post(`${setUrl}api/v1/foods`, data)
            .then(Food.returnFoodObject)
            .then(Food.prependFood)
    }

    static returnFoodObject(food){
        return new Food(food)
    }

}



const food = Food.all();
const newFood = Food.postNewFood('salsa', 200);
// console.log(newFood);
module.exports = Food;