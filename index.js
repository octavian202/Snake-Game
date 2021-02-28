const grid = document.querySelector('.grid')
const startButton = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score')
const width = 10
const squares = []
const speedUp = 0.8

let currentSnake = [2, 1, 0]
let direction = 1;
let timeInterval = 500
let interval = 0
let appleIndex = 0
let score = 0


function createGrid() {
    for (let i = 1; i <= width*width; i++) {

        let newSquare = document.createElement('div')
        newSquare.classList.add('square')
        grid.append(newSquare)
        squares.push(newSquare)
    }

    currentSnake.forEach(index => squares[index].classList.add('snake'))
}

function generateApple() {

    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'));

    squares[appleIndex].classList.add('apple')
}

function move() {

    if (
        (currentSnake[0] + width > 99 && direction === width) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (squares[currentSnake[0] + direction].classList.contains('snake'))
    ) return clearInterval(interval);

    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)

    if (squares[currentSnake[0]].classList.contains('apple')) {

        currentSnake.push(tail)
        squares[tail].classList.add('snake')

        squares[appleIndex].classList.remove('apple')
        generateApple()

        score++
        scoreDisplay.textContent = score

        timeInterval *= speedUp

        clearInterval(interval)
        interval = setInterval(move, timeInterval)
    }

    squares[currentSnake[0]].classList.add('snake')
}

function control(e) {

    const key = e.keyCode;

    if (key === 38 && direction !== width) {
        direction = -width
    } else if (key === 39 && direction !== -1) {
        direction = 1
    } else if (key === 40 && direction !== -width) {
        direction = +width
    } else if (key === 37 && direction !== 1) {
        direction = -1
    }
}

function startGame() {

    clearInterval(interval)
    
    score = 0
    scoreDisplay.textContent = score

    timeInterval = 500

    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    currentSnake = [2, 1, 0]
    currentSnake.forEach(index => squares[index].classList.add('snake'))

    squares[appleIndex].classList.remove('apple')
    generateApple()
    direction = 1

    interval = setInterval(move, timeInterval)
    
}


createGrid()
document.addEventListener('keydown', control)
startButton.addEventListener('click', startGame)