const $ = require('jquery');
const HTMLHelper = require('../helpers/htmlHelper');
const setUrl = require('../config/apiUrl').setUrl;
const AjaxRequests = require('../helpers/ajaxHelper');

class Food {

    static all() {
        AjaxRequests.get()
        .then( (response) => {
            const use_checkbox = document.title === "Quantified Self - Manage Foods" ? false : true;
            response.forEach( (food) => {
                const foodRowTemplate = HTMLHelper.toHtml({foodName: food.name, foodCalorie: food.calories, id: food.id, use_checkbox: use_checkbox});
                $('.all-foods').append(foodRowTemplate);
            })
        })
    }

    static addNewFood(event) {
        event.preventDefault();
        let foodName = $('.name-input').val();
        let foodCalorie = $('.calorie-input').val();

        Food.postNewFood(foodName, foodCalorie)
    }

    static postNewFood(foodName, foodCalorie){
        let data = { food: { name: foodName, calories: foodCalorie } }

        $.post(`${setUrl}api/v1/foods`, data)
            .then((response) => {
              const id = response.id;
              const foodRowTemplate = HTMLHelper.toHtml({foodName: foodName, foodCalorie: foodCalorie, id: id, checkbox: false});
              $('.all-foods tr:first').after(foodRowTemplate);
            })
            .then(HTMLHelper.resetForm())
            .catch(() => {
              console.log('The food was not persisted to the database!')
            });
    }

    static delete(id) {
      return $.ajax({
        type: 'DELETE',
        url: setUrl + 'api/v1/foods/' + id,
      })
      .then((response) => {
        $(`tr.id-${id}`).remove();
      })
      .catch((error) => {
        console.log('There was an error. The error is:');
        console.log(error);
      })
    }

    static newFoodEvent(){
        $('.form-food').on('submit', (event) => {
            Food.addNewFood(event);
        });
    }

    static deleteEvent(){
        $('.all-foods').on('click', '.delete', (event) => {
            const id = event.target.dataset.id;
            Food.delete(id);
        });
    }

    static updateFoodEvent(){
        $('.all-foods').on('keyup', '#foodName', (event) => {
            const changedFoodName = event.target.innerText;
            const id = event.target.dataset.id;
            AjaxRequests.updateFoodName(id, changedFoodName);
        });
    }

    static updateCalorieEvent(){
        $('.all-foods').on('keyup', '#foodCalorie', (event) => {
            const changedFoodCalorie = event.target.innerText;
            const id = event.target.dataset.id;
            AjaxRequests.updateFoodCalorie(id, changedFoodCalorie);
        });
    }

    static foodFilter(){
        $("#searchInput").keyup(function () {
          let data = this.value.toUpperCase().split(" ");
            // jo stands for jquery object
            let jo = $(".all-foods").find("tr");
            if (this.value == "") {
                jo.show();
                return;
            }
            jo.hide();
            jo.filter( function () {
                let $v = $(this);
                for (let i = 0; i < data.length; ++i) {
                    if ($v.text().toUpperCase().indexOf(data[i]) > -1) {
                        return true;
                    }
                }
                return false;
            })
            .show();
        }).focus(function () {
          this.value = "";
          $(this).css({
              "color": "black"
          });
          $(this).unbind('focus');
          }).css({
          "color": "#C0C0C0"
          });
    }
}

module.exports = Food;
