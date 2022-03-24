"use strict";

// David ELBAZ 

// Pieces Types
const MINE_BLACK = "💣";
const RED_FLAG = "🚩";
const RED_HEARTS = "🫀";

const NUMBER_ONE = "1️⃣";
const NUMBER_TWO = "2️⃣";
const NUMBER_THREE = "3️⃣";
const NUMBER_FOUR = "4️⃣";

// Global variables

var gIsFirstClickOn = true;
var gTotalOfSec = 0;
var gTimeVar = 0;
var gLife;

var gBoard; // The Model


var gLevel = {
  SIZE: 4,
  MINES: 2,
};

var gGame = {
  isOn: false,
  leftLives: 3,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};



initGame();


function initGame() {

    window.addEventListener("contextmenu", e => e.preventDefault()); 
    var gLife = document.querySelector('.Message span')
    gLife.innerText = RED_HEARTS + RED_HEARTS + RED_HEARTS

    
    document.querySelector(".smiley").innerText = '😀';
    gBoard = buildBoard()
    setRandomMine(gBoard, gLevel.MINES)
    setMinesNegCount(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    console.log('gBoard', gBoard)
    resetTimer()


}

function buildBoard(board) {
  //build the board 4 * 4
 
  var board = [];
  for (var i = 0; i < gLevel.SIZE; i++) {
     board[i] = [];
     for (var j = 0; j < gLevel.SIZE; j++) {
        var cell = {
            minesAroundCount: 0,
            isShown: false,
            isMine: false,
            isMarked: false
        }
        board[i][j] = cell;
    }
    // console.log(board)
  } return board
     

}


function setMinesNegCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            if (cell.isMine) continue
            var mineCount = countNegOfMines(board,i, j)
            if (mineCount > 0) {
                cell.minesAroundCount = mineCount
            }
        }
    }
}

function countNegOfMines(mat ,cellI, cellJ) {
    var countOfNeg = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) countOfNeg++;
        }
    }
    return countOfNeg;
}

function renderBoard(board) {
    var strHTML = '';

    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = (cell.isMine) ? 'hidden-mine' : ''

            strHTML += `\t<td class="${className}"  oncontextmenu="cellMarked(this, ${i}, ${j})"
             onclick="cellClicked(this, ${i}, ${j})"  ></td>\n`
        }
        strHTML += `</tr>\n`
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
    // console.log(board);
    
}

  
function cellClicked(elCell, i, j) {
    

    if (gGame.isOn) {

        if (!gGame.secsPassed) startTimer()

        var cell = gBoard[i][j]

        if (cell.isMarked) return
        if (cell.isShown) return
        
        if (cell.isMine && gGame.leftLives === 0) {
            stopTimer()
            revealAllMines()
            gGame.isOn = false
             alert("YOU LOST!")

        } if (cell.isMine) {
            elCell.innerHTML = '💣'
            lostLife()
        }

        if (cell.minesAroundCount) {
            cell.isShown = true
            gGame.shownCount++
                elCell.innerHTML = cell.minesAroundCount
            elCell.classList.add('shownCell')
        }


        if (!cell.minesAroundCount && !cell.isMine) {
            cell.isShown = true
            gGame.shownCount++
                elCell.classList.add('shownCell')
            expandShown(i, j)
        }

        console.log('shownCount', gGame.shownCount);
        checkGameOver()
    }
}
function cellMarked(elCell, i, j) {

    if (gGame.isOn) {

        if (!gGame.secsPassed) startTimer()
        var cell = gBoard[i][j]

        if (cell.isShown) return
    

        if (!cell.isMarked) {
            elCell.innerText = RED_FLAG
            cell.isMarked = true
            gGame.markedCount++
        } else if (cell.isMarked) {
            elCell.innerText = ''
            cell.isMarked = false
            gGame.markedCount--
        }
        console.log('markedCount', gGame.markedCount);
        checkGameOver()
    }
}

function checkGameOver() {
    var cellMarked = gLevel.MINES
    var cellShown = gLevel.SIZE ** 2 - gLevel.MINES
    if (cellMarked === gGame.markedCount && cellShown === gGame.shownCount) {
        stopTimer()
        
        gGame.isOn = false
       console.log('End Of The Game');
       alert("You Won!")
    }

}

function setRandomMine(board, mines) {
    for (var i = 0; i < mines; i++) {
        var cell = getEmptyCell(board)
        cell.isMine = true
    }
}

function getEmptyCell(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j]
            if (!currCell.isMine) emptyCells.push(currCell)
        }
    }
     var randomIdx = getRandomIntExclusive(0, emptyCells.length)
     return emptyCells[randomIdx]
}

function revealAllMines() {
    
    for (var i = 0; i < gLevel.MINES; i++) {
        var elCell = document.querySelector('.hidden-mine')
        elCell.innerText = MINE_BLACK
        elCell.classList.remove('hidden-mine')
        elCell.classList.add('mine')
    }
    console.log('BOOM');
    document.querySelector(".smiley").innerText = '😢';
}

function expandShown(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;

            var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
            var cell = gBoard[i][j]

            if (cell.minesAroundCount) {
                if (!cell.isShown) {
                    cell.isShown = true
                    gGame.shownCount++
                        elCell.innerHTML = cell.minesAroundCount
                    elCell.classList.add('shownCell')
                }
            } else if (!cell.minesAroundCount && !cell.isMine) {
                if (!cell.isShown) {
                    cell.isShown = true
                    gGame.shownCount++
                        elCell.classList.add('shownCell')
                    expandShown(i, j)
                }
            }
        }
    }
}

function lostLife() {
    gGame.leftLives--
        var lives = ''
    for (var i = 0; i < gGame.leftLives; i++) {
        lives += RED_HEARTS
    }
    console.log(lives, 'lives');
    var elLives = document.querySelector('.Message span')
    elLives.innerText = lives
}

function changeDifficulty(num) {
    switch (num) {
        case 1 :
            gLevel = {
                SIZE: 4,
                MINES: 2
            };
            break
        case 2:
            gLevel = {
                SIZE: 8,
                MINES: 12
            };
            break
        case 3 :
            gLevel = {
                SIZE: 12,
                MINES: 30
            };
            break
    }
    resetGame()
    initGame()
}

function resetGame() {
    gGame.isOn = false;
    gGame.secsPassed = 0;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gTotalOfSec = 0;
    gGame.lives = 3;
    // gIsFirstClick = true;
    clearInterval(gTimeVar)
    
    document.querySelector(".smiley").innerText = '😀';
    initGame()
 
}



        

function getRandomIntExclusive(min, max) { // IS NOT DEFINED WHEN NOT IN CG.JS FILE  
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

var gElStopWatch = document.querySelector('.timer') 
var gTimerInterval
var gStartTime


function timerCycle() {
    var currTime = Date.now()
    var sec = (currTime - gStartTime) / 1000
    sec = sec.toFixed(2)
    gElStopWatch.innerHTML = sec
    gGame.secsPassed = sec
}

function startTimer() {
    gStartTime = Date.now()
    gTimerInterval = setInterval(timerCycle, 10)
}

function stopTimer() {
    clearInterval(gTimerInterval)
}

function resetTimer() {
    clearInterval(gTimerInterval)
    gElStopWatch.innerText = '00.00'
}








