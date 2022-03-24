

function getRandomIntExclusive(min, max) {
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

function getRandomIntExclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// יוצר טבלה
function renderaBoard(board) {
    var strHTML = "";
    for (var i = 0; i < board.length; i++) {
        strHTML += "<tr>";
        for (var j = 0; j < board[0].length; j++) {
            // var className = board[i][j] ? 'occupied' : '';
            // strHTML += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(${i},${j},this)" class="${className}">${board[i][j]}</td>`;
        }
        strHTML += "</tr>";
    }
    // var elboard = document.querySelector('.board');
    // elboard.innerHTML = strHTML;
}



// function drawNum(board) {
           
//                 var rNum = Math.floor(Math.random() * board.length );
//                 for (var i = 0; i < board.length; i++) {
//                     for (var j = 0; j < board[0].length; j++) {
//                         if (rNum === board[i][j].value && board[i][j].isHit === false) {
//                             board[i][j].isHit = true;
//                             gPlayers[0].hitCount += 1;
//                         }
//                     }
//                 }
//             }
    
    
// function timerCount() {
//     ++gTotalOfSec;
//     var hours = Math.floor(gTotalOfSec / 3600);
//     var minutes = Math.floor((gTotalOfSec - hours * 3600) / 60);
//     var seconds = gTotalOfSec - (hours * 3600 + minutes * 60);
//     document.querySelector(".timer").innerHTML = hours + ":" + minutes + ":" + seconds;
// }




// function shownOrMarked(board, i, j) {
//     if (board[i][j].isShown === false) return ''
//     if (board[i][j].isMarked) {
        
//         return
        
//     } else if (board[i][j].isMine) {
//         return BOMB
//     } else return board[i][j].minesAroundCount;
// }