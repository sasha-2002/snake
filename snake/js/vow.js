let topscore = 0; 
tor();

function tor() {
    const canvas = document.getElementById("game");
    const ctx = can.getContext("2d");
   
    const cupimg = new Image();
    cupimg.src = "img/cup.png";
    const snake1 = new Image();
    snake1.src = "img/sds.svg";

    const snake0 = new Image();
    snake0.src = "img/snake00.svg";

    const foodimg = new Image();
    foodimg.src = "img/apple.png";
    let box = 32;
    let score = 0;
    const bc = new Image();
    bc.src = "img/bc.jpg";


    let food = {
        x: Math.floor((Math.random() * 24)) * box,
        y: Math.floor((Math.random() * 18 + 1)) * box,
    };
    let snake = [];
    snake[0] = {
        x: 12 * box,
        y: 10 * box
    };

    document.addEventListener("keydown", direction);
    let dir;

    function direction(event) {

        if (event.keyCode == 37 && dir != "right")
            dir = "left";
        else if (event.keyCode == 38 && dir != "down")
            dir = "up";
        else if (event.keyCode == 39 && dir != "left")
            dir = "right";
        else if (event.keyCode == 40 && dir != "up")
            dir = "down";
    } //відстеження натисків на кнопки

    
        var initialPoint;
        var finalPoint;
        document.addEventListener('touchstart', function(event) {
            event.preventDefault();
            event.stopPropagation();
            initialPoint = event.changedTouches[0];
        }, false);
        document.addEventListener('touchend', function(event) {
            event.preventDefault();
            event.stopPropagation();
            finalPoint = event.changedTouches[0];
            var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
            var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
            if (xAbs > 20 || yAbs > 20) {
                if (xAbs > yAbs) {
                    if (finalPoint.pageX < initialPoint.pageX && dir != "right") {
                        dir = "left";
                    } else if (dir != "left") {
                        dir = "right";
                    }
                } else {
                    if (finalPoint.pageY < initialPoint.pageY && dir != "down") {
                        dir = "up";
                    } else if (dir != "up") {
                        dir = "down";
                    }
                }
            }
        }, false);


    function eatTail(head, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (head.x == arr[i].x && head.y == arr[i].y) {
                clearInterval(game);
                var result = confirm("ви програли, продовжити гру?");
                if (result == true) {

                    tor();
                } else {
                    alert("щасти!!");
                    tor();
                }
            }
        }
    }

    function drawGame() {
        ctx.drawImage(bc, 0, 0);
        ctx.drawImage(foodimg, 0, 0);
        ctx.drawImage(cupimg, 200, 0);
        ctx.drawImage(foodimg, food.x, food.y);

        ctx.drawImage(snake0, snake[0].x, snake[0].y, 32, 32);
        for (let i = 1; i < snake.length; i++) {
            ctx.drawImage(snake1, snake[i].x, snake[i].y, 32, 32);
        }
     

        ctx.fillStyle = "red";
        ctx.font = "32px Arial";
        ctx.fillText(score, 35, 30);
        if (score > topscore) {
            topscore = score;
        }
        ctx.fillText(topscore, 238, 30);
        
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        
        if (snakeX == food.x && snakeY == food.y) {
            score++;
            food = {
                x: Math.floor((Math.random() * 24)) * box,
                y: Math.floor((Math.random() * 18 + 1)) * box,
            };
        } else {
            snake.pop();
        }
        if (snakeX < 0 || snakeX > 768 ||
            snakeY < 32 || snakeY > 620) {
            clearInterval(game);
            var result = confirm("ви програли, продовжити гру?");
            if (result == true) {
                tor();
            } else {
                alert("щасти!!");
                tor();
            }
        }

        if (dir == "left") snakeX -= box;
        if (dir == "right") snakeX += box;
        if (dir == "up") snakeY -= box;
        if (dir == "down") snakeY += box;
     
        let newHead = {
            x: snakeX,
            y: snakeY
        };

        eatTail(newHead, snake); 

        snake.unshift(newHead); 

    }
    let game = setInterval(drawGame, 100);
    
}
