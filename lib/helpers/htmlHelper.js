const $ = require('jquery');

class HTMLHelper {
    static toHtml(foodName, foodCalorie){
        return `
                <tr>
                  <td>${foodName}</td>
                  <td>${foodCalorie}</td>
                  <td><button class="delete">Delete</button></td>
                </tr>
               `;
    }
}

module.exports = HTMLHelper;
