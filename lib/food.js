//food functions
function Food() {

  this.foodSize = 20;
  this.foodPosition = {
    x: 0,
    y: 0
  }

  //function to create the food on HTML
  this.create = function () {
    let arena = document.getElementById("arena");

    let food = document.createElement("div");

    food.id = "food";

    this.foodPosition.x = computePosition(arenaSize);
    this.foodPosition.y = computePosition(arenaSize);

    food.style.left = this.foodPosition.x + "px";
    food.style.top = this.foodPosition.y + "px";

    arena.appendChild(food);
  }

  //function the change the food position
  this.changePosition = function () {
    let food = document.getElementById("food");

    this.foodPosition.x = computePosition(arenaSize);
    this.foodPosition.y = computePosition(arenaSize);

    food.style.left = this.foodPosition.x + "px";
    food.style.top = this.foodPosition.y + "px";
  }

  //function to get the food current position
  this.getPosition = function () {
    return this.foodPosition;
  }

  //function to compute the next food position
  function computePosition(max) {
    let position = Math.floor((Math.random() * max + 1) - 20);

    while (position % 20 != 0) {
      position = Math.floor((Math.random() * max + 1) - 20);
    }

    return position;
  }
}