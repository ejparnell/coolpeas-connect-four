/*----- constants -----*/

// This is a constant for this file
const COLORS = {
    0: 'white',
    1: 'purple',
    // if we have a negative num we can throw it in a string
    '-1': 'orange'
}

/*----- state variables -----*/

let board // array of 7 nested arrays
let turn // 1 || -1
let winner // null || 1 || -1 || 'T'

/*----- cached elements  -----*/

const messageEl = document.querySelector('h2')
const playAgainBtn = document.querySelector('button')
// NodeList !== Arrays
// NodeList.forEach() !== Array.forEach()
// Have to change my NodeList to an array so I can do normal JavaScript
// ... - spread operator, Takes a COPY of whatever (object, NodeList, HTMLCollection, array) pushes into our array
const markerEls = [...document.querySelectorAll('#markers > div')]

/*----- event listeners -----*/

document.getElementById('markers').addEventListener('click', handleDrop)
playAgainBtn.addEventListener('click', init)

/*----- functions -----*/

init()

function init() {
    board = [
			[0, 0, 0, 0, 0, 0], // col 0
			[0, 0, 0, 0, 0, 0], // col 1
			[0, 0, 0, 0, 0, 0], // col 2
			[0, 0, 0, 0, 0, 0], // col 3
			[0, 0, 0, 0, 0, 0], // col 4
			[0, 0, 0, 0, 0, 0], // col 5
			[0, 0, 0, 0, 0, 0], // col 6
		]

    turn = 1
    winner = null
    render()
}

function render() {
    // renderBoard
    renderBoard()
    // renderMessage
    renderMessage()
    // renderControls
    renderControls()
}

// able to render the board based on the current board state
function renderBoard() {
    board.forEach((colArr, colIdx) => {
        // console.log(colArr, colIdx)
        console.log('==================')
        colArr.forEach((cellVal, rowIdx) => {
            console.log(cellVal, rowIdx)
            const cellId = `c${colIdx}r${rowIdx}`
            const cellEl = document.getElementById(cellId)
            cellEl.style.backgroundColor = COLORS[cellVal]
        })
    })
}

function renderMessage() {
    // messaging if tie
    if (winner === 'T') {
        messageEl.innerText = "It's a tie!!!!!!"
        // messaging the winner
    } else if (winner) {
        messageEl.innerHTML = `
        <span style="color: ${COLORS[winner]}">
            ${COLORS[winner].toUpperCase()}
        </span> Wins!
        `
        // messaging the current turn
    } else {
        messageEl.innerHTML = `
        <span style="color: ${COLORS[turn]}">
            ${COLORS[turn].toUpperCase()}
        </span>'s Turn!
        `
    }
}

function renderControls() {
    // ask a question ? if true : if false
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden'

    markerEls.forEach((markerEl, colIdx) => {
        // looking for opposite of 0
        const hideMarker = !board[colIdx].includes(0) || winner 

        markerEl.style.visibility = hideMarker ? 'hidden' : 'visible'
    })
}

function handleDrop(event) {
    // console.log(event)
    const colIdx = markerEls.indexOf(event.target)
    // console.log(colIdx)
    if (colIdx === -1) return

    const colArr = board[colIdx]
    // indexOf return the FIRST thing it encounters and returns it
    const rowIdx = colArr.indexOf(0)
    colArr[rowIdx] = turn
    turn *= -1
    winner = getWinner(colIdx, rowIdx)
    render()
}

function getWinner(colIdx, rowIdx) {
    return (
        checkDiagonalWinNESW(colIdx, rowIdx) ||
        checkDiagonalWinNWSE(colIdx, rowIdx) ||
        checkHorizontalWin(colIdx, rowIdx) ||
        checkVerticalWin(colIdx, rowIdx)
    )
}

function checkVerticalWin(colIdx, rowIdx) {
    // going from north to south
    // 0 = not changing our column
    // -1 = moving south
    return countAdjacent(colIdx, rowIdx, 0, -1) === 3 ? board[colIdx][rowIdx] : null
}

function checkHorizontalWin(colIdx, rowIdx) {
    // going to the left
    // -1 = we are moving to the left column
    // 0 = not changing rows
    const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0)
    // going right 
    // 1 = we are moving to the right
    // 0 = we are not moving rows
    const adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0)

    return adjCountLeft + adjCountRight >= 3 ? board[colIdx][rowIdx] : null
}

function checkDiagonalWinNWSE(colIdx, rowIdx) {
    // going north west
    // -1 = moving down 1 
    // 1 = going to the right
    const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1)
    // going south east
    // 1 = moving up 1
    // -1 = moving to the left by 1
    const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1)

    return adjCountNW + adjCountSE >= 3 ? board[colIdx][rowIdx] : null
}

function checkDiagonalWinNESW(colIdx, rowIdx) {
    // going north east
    // 1 = going up by 1
    // 1  = going to the right by 1
    const adjCountNE = countAdjacent(colIdx, rowIdx, 1, 1)
    // going south west
    // -1 = moving down by 1
    //-1 = going to the left
    const adjCountSW = countAdjacent(colIdx, rowIdx, -1, -1)

    return adjCountNE + adjCountSW >= 3 ? board[colIdx][rowIdx] : null
}

function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
    // I want to grab the player
    const player = board[colIdx][rowIdx]
    let count = 0

    // while loop 
    colIdx += colOffset
    rowIdx += rowOffset
    // we need to keep on the board
    // and only count if the disc matches the player
    while (
        board[colIdx] !== undefined &&
        board[colIdx][rowIdx] !== undefined &&
        board[colIdx][rowIdx] === player
    ) {
        count++
        colIdx += colOffset
        rowIdx += rowOffset
    }

    return count
}