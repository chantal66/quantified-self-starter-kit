const $ = require('jquery');

const setUrl = 'http://whispering-earth-58532.herokuapp.com/';

class Food {
    constructor(attrs) {
        this.id = attrs.id;
        this.name = attrs.name;
        this.calories = attrs.calories
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
                                        </tr>`;
                $('.all-foods').append(foodRowTemplate);
            })
        })
    }
}




const food = Food.all();
// console.log(food);
