const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const displayScore = document.getElementById("score");
let squares = [];
let currentSnake = [2,1,0];
let direction = 1;
const width = 20;
let appleIndex = 0;
let score = 0;
let intervalTime = 800;
let speed = 0.9;
let timerId = 0;

function createGrid() {

    // create squares in grid

    for (let i = 0; i < width*width; i++) {
        //create individual squares
        const square = document.createElement("div");
        //add styling
        square.classList.add("square");
        // put squares onto grid
        grid.appendChild(square);
        // push squares into array
        squares.push(square);
    }
}
createGrid();

currentSnake.forEach(index => squares[index].classList.add("snake"));

function startGame() {
    // remove snake
    currentSnake.forEach(index => squares[index].classList.remove("snake"));
    // remove apple
    squares[appleIndex].classList.remove("apple");
    clearInterval(timerId);
    currentSnake = [2,1,0];
    score = 0;
    displayScore.textContent = score;
    direction = 1;
    intervalTime = 800;
    generateApples();
    currentSnake.forEach(index => squares[index].classList.add("snake"));
    timerId = setInterval(move, intervalTime);
}

function move() {
    // check if snake has hit walls
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || // hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || // hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || // hit top
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) 
    return clearInterval(timerId);

    //remove last element from currentSnake
    const tail = currentSnake.pop();
    //remove styling from last element
    squares[tail].classList.remove("snake");
    //add square in direction of moving
    currentSnake.unshift(currentSnake[0] + direction);
    //add styling

    // snake head eating apple

    if (squares[currentSnake[0]].classList.contains("apple")) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove("apple")
        // grow snake + snake array
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        //generate new apple
        generateApples();
        // add 1 to score
        score++
        displayScore.textContent = score;
        // increase speed
        clearInterval(timerId);
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime)
    }

    squares[currentSnake[0]].classList.add("snake");
}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple");
}
generateApples();

function control(e) {
    if (e.keyCode === 39 && !(direction === -1)) {         // keyCode 39 = right arrow
        direction = 1;
    } else if (e.keyCode === 38 && !(direction === +width)) {  // keyCode 38 = up arrow
        direction = -width;
    } else if (e.keyCode === 37 && !(direction === 1)) {  // keyCode 37 = left arrow
        direction = -1;
    } else if (e.keyCode === 40 && !(direction === -width)) {  // keyCode 40 = down arrow
        direction = +width;
    }
}

document.addEventListener("keydown", control);
startBtn.addEventListener("click", startGame);