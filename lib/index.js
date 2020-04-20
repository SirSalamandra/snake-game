const arenaSize = 600;

let snake = null;
let arena = null;
let food = null;

let walkInterval;

let gameStarted = false;
let gamePaused = false;
let gameOver = false;

let lastKeyPressed = "ArrowUp";

//function to start the game
function startGame() {
    gamePaused = false;
    gameOver = false;
    lastKeyPressed = "ArrowUp";

    //verify if it is the fist time as the game start.
    if (!gameStarted) {
        //start the game
        gameStarted = true;

        //create the arena
        createArena();

        //create the food
        createFood();
    }

    //create the snake
    createSnake();

    //start the snake move
    setWalkInterval(100);
}

//function to set the interval to make the snake move
function setWalkInterval(interval) {
    walkInterval = setInterval(() => {
        if (!gamePaused && !gameOver) whenWalk(lastKeyPressed)
    }, interval);
}

//function to instance and create the arena
function createArena() {
    if (arena == null) arena = new Arena();
    arena.create(arenaSize);
}

//function to instance and create the food
function createFood() {
    if (food == null) food = new Food();
    food.create();
}

//function to instance and create the snake
function createSnake() {
    if (snake == null) snake = new Snake();
    snake.create();
}

//function executed always a key is pressed to set the "LastKeyPressed" and make the snake move for X direction or to pause the game
function whenKeyPressed(e) {
    switch (e.key) {
        case "ArrowUp":
            if (!gamePaused) lastKeyPressed = e.key;
            break;

        case "ArrowDown":
            if (!gamePaused) lastKeyPressed = e.key;
            break;

        case "ArrowLeft":
            if (!gamePaused) lastKeyPressed = e.key;
            break;

        case "ArrowRight":
            if (!gamePaused) lastKeyPressed = e.key;
            break;

        case " ":
            gamePaused = !gamePaused;
            break;

        default:
            break;
    }
}

//function executed by the interval to make the snake move and check if she collide in something or ate the food
function whenWalk(direction) {
    let foodPosition;
    snake.walk(direction, (snakePosition, collided) => {
        if (collided) {
            handleCollision();
            return;
        }

        foodPosition = food.getPosition();

        if (ateTheFood(foodPosition, snakePosition)) {
            whenEatFood();
        };
    });
}

//function to check if the snake ate the food
function ateTheFood(foodPosition, snakePosition) {
    if (foodPosition.x === snakePosition.x && foodPosition.y === snakePosition.y) return true;
    else return false;
}

//function executed when the snake eat the food to make she grow and change the food position
function whenEatFood() {
    food.changePosition();
    snake.grow();
}

//function to handle the collision
function handleCollision() {
    clearInterval(walkInterval);
    gameOver = true;
    snake.remove();
    if (confirm("You lose! \n\nPress \"OK\" to restart the game!")) startGame();
}