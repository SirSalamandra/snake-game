//snake functions
function Snake() {
    this.total = 1;
    this.snakeSize = 20;
    this.initialPX = 300;
    this.initialPY = 300;

    this.px = 0;
    this.py = 0;

    this.snakeBody = [];

    //function to create the snake on HTML
    this.create = function () {
        let arena = document.getElementById("arena");

        for (let i = 1; i <= this.total; i++) {
            let snake = document.createElement("div");
            snake.id = i;
            snake.className = "snake";
            snake.style.backgroundColor = "red";
            snake.style.zIndex = "3";
            snake.style.left = (this.initialPX - this.snakeSize) + "px";
            snake.style.top = (this.initialPY + (this.snakeSize * i)) + "px";

            let params = {
                id: i,
                x: this.initialPX - this.snakeSize,
                y: this.initialPY + (this.snakeSize * i)
            }

            this.snakeBody.push(params)

            arena.appendChild(snake);
        }
    };

    //function to make the snake grow
    this.grow = function () {
        let arena = document.getElementById("arena");

        let snake = document.createElement("div");
        snake.id = this.snakeBody[this.snakeBody.length - 1].id + 1;
        snake.className = "snake";
        let params = {
            id: this.snakeBody[this.snakeBody.length - 1].id + 1,
            x: this.snakeBody[this.snakeBody.length - 1].x,
            y: this.snakeBody[this.snakeBody.length - 1].y
        }

        snake.style.left = params.x + "px";
        snake.style.top = params.y + "px";

        this.snakeBody.push(params);
        this.total++;

        arena.appendChild(snake);
    }

    //function to make the snake walk    
    this.walk = function (direction, callback) {
        let snake;
        let x;
        let y;

        //switch to set the X and Y values depending on the direction chosen
        switch (direction) {
            case "ArrowUp":
                x = 0;
                y = -20;
                break;
    
            case "ArrowDown":
                x = 0;
                y = 20;
                break;
    
            case "ArrowLeft":
                x = -20;
                y = 0;
                break;
    
            case "ArrowRight":
                x = 20;
                y = 0;
                break;
    
            default:
                break;
        }

        //for to set the position for each part of the snake body
        for (let i = 1; i <= this.total; i++) {
            snake = document.getElementById(i);

            this.snakeBody.some(ele => {
                if (ele.id == i) {
                    ele.x = snake.offsetLeft;
                    ele.y = snake.offsetTop;
                    return;
                }
            });

            //head
            if (i == 1) {
                if (verifyColision(this.snakeSize, this.snakeBody[0], x, y)) {
                    return callback(this.snakeBody[0], true);
                }
                    

                snake.style.left = (snake.offsetLeft + x) + "px";
                snake.style.top = (snake.offsetTop + y) + "px";
            }
            //body
            else {
                this.snakeBody.some(ele => {
                    if (ele.id == i - 1) {
                        this.px = ele.x;
                        this.py = ele.y;
                        return;
                    }

                    snake.style.left = (this.px) + "px";
                    snake.style.top = (this.py) + "px";
                });
            }
        }

        return callback(this.snakeBody[0], false);
    };

    //function to remove all the snake from the arena when the player lose
    this.remove = function () {
        let snake;
        let arena = document.getElementById("arena");

        for (let i = 1; i <= this.total; i++) {
            snake = document.getElementById(i);

            arena.removeChild(snake);
        }

        this.total = 1;
        this.snakeBody = [];
        this.py = 0;
        this.px = 0;
    }

    //function to verify the wall colision
    function verifyColision(snakeSize, snakePosition, nextX, nextY) {
        if ((snakePosition.x + nextX < 0) || ((snakePosition.x + nextX) > (arenaSize - snakeSize))) return true;
        if ((snakePosition.y + nextY < 0) || ((snakePosition.y + nextY) > (arenaSize - snakeSize))) return true;

        return false;
    }
};