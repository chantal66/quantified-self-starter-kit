const $ = require('jquery');

class HTMLHelper {
    static toHtml(food){
        return `
          <div class="food-row">
            <div class="grid-item food-data-id">${food.id}</div>
            <div class="grid-item food-data-name food" contenteditable="true">${food.name}</div>
            <div class="grid-item food-data-calorie" contenteditable="true">${food.calories}</div>
            <div class="grid-item food-data-delete"><img src='' class='food-delete delete-icon'></div>
          </div>
        `
    }
}

module.exports = HTMLHelper;