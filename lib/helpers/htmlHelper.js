const $ = require('jquery');

class HTMLHelper {
    static toHtml(foodName, foodCalorie, id, page){
        if (page === 'diary') {
          var checkbox = '<input type="checkbox" />'
        } else {
          var checkbox = '';
        }
        return `
                <tr class="id-${id}">
                  <td>${checkbox}</td>
                  <td id="foodName" data-id="${id}" contenteditable='true'>${foodName}</td>
                  <td id="foodCalorie" data-id="${id}" contenteditable='true' >${foodCalorie}</td>
                  <td><button class="delete" data-id="${id}">Delete</button></td>
                </tr>
               `;
    }

    static resetForm() {
        $(".name-input").val("");
        $(".calorie-input").val("");
    }



}

module.exports = HTMLHelper;
