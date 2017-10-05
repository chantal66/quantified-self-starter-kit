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
                $('.all-foods').append('<tr> some </tr>')
            })
        })
    }
}




const food = Food.all();
// console.log(food);