const grid = document.querySelector('.grid')
const startButton = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score')
const width = 10
let currentSnake = [2, 1, 0]
let score = 0
let squares = []
let direction = 1
let timerId = null
let intervalTime = 350
const speedUp = 0.5
let appleIndex = 0

function createGrid() {
    
    for (let i = 1; i <= width*width; i++) {
        const newSquare = document.createElement('div')
        newSquare.classList.add('square')
        grid.append(newSquare)
        squares.push(newSquare)
    }

    currentSnake.forEach(snakeSquare => squares[snakeSquare].classList.add('snake'))
}

function startGame() {

    clearInterval(timerId)

    currentSnake.forEach(snakeSquare => squares[snakeSquare].classList.remove('snake'))
    currentSnake = [2, 1, 0]
    currentSnake.forEach(snakeSquare => squares[snakeSquare].classList.add('snake'))

    score = 0
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000

    squares[appleIndex].classList.remove('apple')
    generateApple()

    timerId = setInterval(move, intervalTime)
}

function move() {

    if (
        (currentSnake[0] - width < 0 && direction === -width) ||
        (currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (squares[currentSnake[0] + direction].classList.contains('snake'))
    ) return clearInterval(timerId)

    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)

    if (squares[currentSnake[0]].classList.contains('apple')) {

        currentSnake.push(tail)
        squares[tail].classList.add('snake')

        squares[currentSnake[0]].classList.remove('apple')
        generateApple()

        clearInterval(timerId)
        //intervalTime *= speedUp
        timerId = setInterval(move, intervalTime)

        score++
        scoreDisplay.textContent = score
    }
    
    squares[currentSnake[0]].classList.add('snake')
}

function generateApple() {

    do {
        appleIndex = Math.floor(Math.random() * squares.length)

    } while (squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple')
} 

function control(e) {
    const key = e.keyCode;

    if (key === 40 && direction !== -10) {
        direction = width
    } else if (key === 38 && direction !== 10) {
        direction = -width
    } else if (key === 37 && direction !== 1) {
        direction = -1
    } else if (key === 39 && direction !== -1) {
        direction = 1
    }
}

createGrid()
document.addEventListener('keydown', control)
startButton.addEventListener('click', startGame)