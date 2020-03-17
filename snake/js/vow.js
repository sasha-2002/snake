let topscore = 0; //найкращий результат
tor(); //викликаємо основну функцію

function tor() {
    const canvas = document.getElementById("game");
    const ctx = can.getContext("2d");
    //підключаємо канвас на якому і буде малюватися наша змія
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
    //підключаємо основні зображення та змінні

    let food = {
        x: Math.floor((Math.random() * 24)) * box,
        y: Math.floor((Math.random() * 18 + 1)) * box,
    }; //координати їжі 
    let snake = [];
    snake[0] = {
        x: 12 * box,
        y: 10 * box
    }; //початкові координати змії

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



//масив по ітераціях


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
    } //перевірка на те чи ми не програли

    function drawGame() {
        ctx.drawImage(bc, 0, 0);
        ctx.drawImage(foodimg, 0, 0);
        ctx.drawImage(cupimg, 200, 0);
        ctx.drawImage(foodimg, food.x, food.y);

        ctx.drawImage(snake0, snake[0].x, snake[0].y, 32, 32);
        for (let i = 1; i < snake.length; i++) {
            ctx.drawImage(snake1, snake[i].x, snake[i].y, 32, 32);
        }
        //відображуємо наші зображення 

        ctx.fillStyle = "red";
        ctx.font = "32px Arial";
        ctx.fillText(score, 35, 30);
        if (score > topscore) {
            topscore = score;
        }
        ctx.fillText(topscore, 238, 30);
        //відображаємо наш рахунок в грі
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        //змінні для перевірки (голова змії)
        if (snakeX == food.x && snakeY == food.y) {
            score++;
            food = {
                x: Math.floor((Math.random() * 24)) * box,
                y: Math.floor((Math.random() * 18 + 1)) * box,
            };
        } else {
            snake.pop();
        } //якщо ми зїли їжу то малюємо її в новому місці, якщо ні то малюємоо змію в інших координатах
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
        } //перевірка чи ми не вийшли за межі ігрового поля

        if (dir == "left") snakeX -= box;
        if (dir == "right") snakeX += box;
        if (dir == "up") snakeY -= box;
        if (dir == "down") snakeY += box;
        //рух змії
        let newHead = {
            x: snakeX,
            y: snakeY
        };

        eatTail(newHead, snake); //виклик функції перевірки чи ми не програли

        snake.unshift(newHead); //добавлення тіла змії

    }
    let game = setInterval(drawGame, 100);
    //виклик функції з певною частотою аби рух змії був більш менш плавний
}