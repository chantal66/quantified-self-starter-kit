const $ = require('jquery');
const setUrl = require('../models/apiUrl').setUrl;

class AjaxRequests {
    static get(){
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
}

module.exports = AjaxRequests;