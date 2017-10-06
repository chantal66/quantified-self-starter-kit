const $ = require('jquery');

class HTMLHelper {
    static toHtml(foodName, foodCalorie, id){
        return `
                <tr class="id-${id}">
                  <td>${foodName}</td>
                  <td>${foodCalorie}</td>
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
