class SortingHelper {
  static quickSort(foods) {
   const foodsLength = foods.length;
   if (foodsLength <= 1 ) {
     // if the array only has one element, return the array
     return foods;
   } else if (!!foods.reduce((a, b) => { return (a.calories === b.calories) ? a : NaN })) {
     // if every element in the array has the same value, return the array
    return foods;
   }
   else {
     const pivotIndex = Math.floor(Math.random() * foodsLength);
     const pivotCalories = foods[pivotIndex].calories;
     let lesserThanOrEqualToPivot = new Array();
     let greaterThanPivot = new Array();
     foods.forEach((food) => {
      if (food.calories <= pivotCalories) {
        const newIndex = lesserThanOrEqualToPivot.length;
        lesserThanOrEqualToPivot[newIndex] = food;
      } else {
        const newIndex = greaterThanPivot.length
        greaterThanPivot[newIndex] = food;
      }
    });
    let sortedLesser = SortingHelper.quickSort(lesserThanOrEqualToPivot);
    let sortedGreater = SortingHelper.quickSort(greaterThanPivot);
    const sorted = sortedLesser.concat(sortedGreater);
    return sorted;
   }
  }

  static objectIntoArray(object) {
    const array = new Array();
    Object.keys(object).map((key) => {
      array[key] = object[key];
    });
    return array;
  }
}

module.exports = SortingHelper;
