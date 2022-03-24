'use strict'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function copyMat(mat) {
  var newMat = []
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = []
    for (var j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j]
    }
  }
  return newMat
}

let gNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
function drawNum() {
  //NOTICE: WE NEED GLOBAL NUMBERS ARRAY - gNumbers
  const idx = getRanndomIntInclusive(0, numbers.length - 1)
  return numbers.splice(idx, 1)[0]
}

//** TIMER */

function pad(val) {
  let valString = val + ''
  if (valString.length < 2) return '0' + valString
  return valString
}

gStartTime = Date.now()
function timer() {
  //NOTICE: WE NEED GLOBAL START TIME - gStartTime
  var timeDiff = Date.now() - gStartTime
  //   var currTime = new Date(timeDiff)

  //   return currTime //shows in milliseconds

  //OR
  currTime = new Date(timeDiff)
  var timeStr = pad(currTime.getMinutes()) //pad make it 01, 02 and so on
  timeStr += ':' + pad(currTime.getSeconds())
  return timeStr
}
