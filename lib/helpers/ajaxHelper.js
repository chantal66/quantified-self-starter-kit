const $ = require('jquery');
const setUrl = require('../models/apiUrl').setUrl;

class AjaxRequests {
    static get(){
        return $.ajax({
            type: 'GET',
            url: setUrl + '/api/v1/foods'
        })
    }
}

module.exports = AjaxRequests;