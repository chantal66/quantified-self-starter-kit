const $ = require('jquery');

class HTMLHelper {
    static toHtml(args){
      const foodName = args["foodName"];
      const foodCalorie = args["foodCalorie"];
      const id = args["id"];
      const use_checkbox = args["use_checkbox"];
      const checkbox = use_checkbox === true ? '<input type="checkbox" />' : '';
        return `
                <tr class="id-${id}">
                  <td>${checkbox}</td>
                  <td id="foodName" data-id="${id}" contenteditable='true'>${foodName}</td>
                  <td class="calories" id="foodCalorie" data-id="${id}" contenteditable='true' >${foodCalorie}</td>
                  <td><button class="delete" data-id="${id}">Delete</button></td>
                </tr>
               `;
    }

    static resetForm() {
        $(".name-input").val("");
        $(".calorie-input").val("");
    }

    static caloriesToHTML(calories, meal){
        $(`.${meal} td.sum`).text(calories);
    }

    static resetCheckbox(){
        $('input:checked').prop('checked', false);
    }
}

module.exports = HTMLHelper;
