// Obtener el elemento canvas y su contexto
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

// Tamaño de la cuadrícula y tamaño de la celda
const gridSize = 20;
const cellSize = canvas.width / gridSize;

// Arreglo que representa la serpiente
let snake = [
    { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) },
    { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) + 1 },
    { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) + 2 }
];

// Dirección inicial de la serpiente
let direction = "right";

// Estado del juego (iniciado o no)
let gameStarted = false;

// Posición de la comida
let food = { x: 10, y: 10 };

// Detectar si el dispositivo es móvil
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Ocultar los botones en dispositivos no móviles
if (!isMobile) {
    document.getElementById("directionButtons").style.display = "none";
}

// Función principal del juego que se ejecuta en intervalos
function main() {
    clearCanvas();

    if (gameStarted) {
        drawFood();
        moveSnake();
        drawSnake();
        checkCollision();
        checkFoodCollision();
        checkSelfCollision();
        checkGameStatus();
    } else {
        drawStartText();
    }
}

// Limpiar el canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Mover la serpiente en la dirección actual
function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y -= 1;
            break;
        case "down":
            head.y += 1;
            break;
        case "left":
            head.x -= 1;
            break;
        case "right":
            head.x += 1;
            break;
    }

    snake.unshift(head);

    if (snake.length > 3) {
        snake.pop();
    }
}

// Dibujar la serpiente en el canvas
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "#66c0f4";
        ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    });
}

// Dibujar la comida en el canvas
function drawFood() {
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

// Dibujar el mensaje de inicio en el canvas
function drawStartText() {
    ctx.fillStyle = "#8d939a";
    ctx.font = "20px Arial";
    ctx.fillText("Presiona una tecla para comenzar", 50, canvas.height / 2);
}

// Verificar colisiones con los bordes del canvas
function checkCollision() {
    const head = snake[0];

    if (
        head.x < 0 ||
        head.x >= gridSize ||
        head.y < 0 ||
        head.y >= gridSize
    ) {
        alert("¡Perdiste! El gusanito chocó contra la pared.");
        resetGame();
    }
}

// Verificar colisión con la comida
function checkFoodCollision() {
    const head = snake[0];

    if (head.x === food.x && head.y === food.y) {
        snake.push({ x: 0, y: 0 });
        food = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
    }
}

// Verificar colisión con el propio cuerpo de la serpiente
function checkSelfCollision() {
    const head = snake[0];

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert("¡Perdiste! El gusanito chocó contra su propio cuerpo.");
            resetGame();
            break;
        }
    }
}

// Verificar estado del juego (mitad y victoria)
function checkGameStatus() {
    if (snake.length >= gridSize * gridSize / 2) {
        alert("Lo estás haciendo muy bien, vas por la mitad.");
    }

    if (snake.length >= gridSize * gridSize - 1) {
        alert("¡Victoria!");
        resetGame();
    }
}

// Reiniciar el juego
function resetGame() {
    snake = [
        { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) },
        { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) + 1 },
        { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) + 2 }
    ];

    direction = "right";
    gameStarted = false;
}

// Cambiar la dirección de la serpiente
function changeDirection(newDirection) {
    if (!gameStarted) {
        gameStarted = true;
    }

    direction = newDirection;
}

// Manejar eventos de teclado para cambiar la dirección
window.addEventListener("keydown", event => {
    if (!gameStarted) {
        gameStarted = true;
    }

    switch (event.key) {
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowRight":
            direction = "right";
            break;
    }
});

// Ejecutar la función principal en intervalos
setInterval(main, 100);
