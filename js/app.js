
/*-------------------------------- Constants -----------------------------*/


const rightEdgeIndex = [21, 32, 43, 54, 65, 76, 87, 98, 109]
const leftEdgeIndex = [11, 22, 33, 44, 55, 66, 77, 88, 99]
const topEdgeIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const bottomEdgeIndex = [111, 112, 113, 114, 115, 116, 117, 118, 119]
const refugeSquares = [0, 10, 110, 120]

/*-------------------------------- Variables -----------------------------*/
let turn, tie, player, firstClickId, secondClickId, hoverTarget, sq, board
let firstClick = ''
let clickCount = 0 
let validMoves = []
let whitePieces = []
let whiteTotalValidMoves = []
let winner = false

/*------------------------ Cached Element References ---------------------*/

const squareEls = document.querySelectorAll(".sqr")
const resetBtnEl = document.querySelector("button")
const messageEl = document.getElementById("message")
const invalidEl = document.getElementById("invalid-move")
/*----------------------------- Event Listeners --------------------------*/

document.addEventListener('DOMContentLoaded', init)
squareEls.forEach(function (el) {
  el.addEventListener('click', handleClick)
})
squareEls.forEach(function (el) {
  el.addEventListener('mouseover', possibleMoves)
})

resetBtnEl.addEventListener('click', init)

/*-------------------------------- Functions -----------------------------*/
function init(evt){
  board = 
  [{boardIdx: 0, isRefuge: true, isEdge: true, isThrone: false, occupied: null},        
  {boardIdx: 1, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  {boardIdx: 2, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  {boardIdx: 3, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 4, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 5, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 6, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 7, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 8, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  {boardIdx: 9, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  {boardIdx: 10, isRefuge: true, isEdge: true, isThrone: false, occupied: null},
  {boardIdx: 11, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  
  {boardIdx: 12, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 13, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 14, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 15, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 16, isRefuge: false, isEdge: false, isThrone: false, occupied: 1},
  {boardIdx: 17, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 18, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 19, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 20, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 21, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  
  {boardIdx: 22, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  {boardIdx: 23, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 24, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 25, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 26, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 27, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 28, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 29, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 30, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 31, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 32, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  
  {boardIdx: 33, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 34, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 35, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 36, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 37, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 38, isRefuge: false, isEdge: false, isThrone: false, occupied: -1},
  {boardIdx: 39, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 40, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 41, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 42, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 43, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  
  {boardIdx: 44, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 45, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 46, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 47, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 48, isRefuge: false, isEdge: false, isThrone: false, occupied: -1},
  {boardIdx: 49, isRefuge: false, isEdge: false, isThrone: false, occupied: -1},
  {boardIdx: 50, isRefuge: false, isEdge: false, isThrone: false, occupied: -1},
  {boardIdx: 51, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 52, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 53, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 54, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  
  {boardIdx: 55, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 56, isRefuge: false, isEdge: false, isThrone: false, occupied: 1},
  {boardIdx: 57, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 58, isRefuge: false, isEdge: false, isThrone: false, occupied: -1},
  {boardIdx: 59, isRefuge: false, isEdge: false, isThrone: false, occupied: -1},
  {boardIdx: 60, isRefuge: false, isEdge: false, isThrone: true, occupied: -2},
  {boardIdx: 61, isRefuge: false, isEdge: false, isThrone: false, occupied: -1},
  {boardIdx: 62, isRefuge: false, isEdge: false, isThrone: false, occupied: -1},
  {boardIdx: 63, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 64, isRefuge: false, isEdge: false, isThrone: false, occupied: 1},
  {boardIdx: 65, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  
  {boardIdx: 66, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 67, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 68, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 69, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 70, isRefuge: false, isEdge: false, isThrone: false, occupied: -1},
  {boardIdx: 71, isRefuge: false, isEdge: false, isThrone: false, occupied: -1},
  {boardIdx: 72, isRefuge: false, isEdge: false, isThrone: false, occupied: -1},
  {boardIdx: 73, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 74, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 75, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 76, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  
  {boardIdx: 77, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 78, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 79, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 80, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 81, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 82, isRefuge: false, isEdge: false, isThrone: false, occupied: -1},
  {boardIdx: 83, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 84, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 85, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 86, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 87, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  
  {boardIdx: 88, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  {boardIdx: 89, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 90, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 91, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 92, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 93, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 94, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 95, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 96, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 97, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 98, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  
  {boardIdx: 99, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  {boardIdx: 100, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 101, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 102, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 103, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 104, isRefuge: false, isEdge: false, isThrone: false, occupied: 1},
  {boardIdx: 105, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 106, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 107, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 108, isRefuge: false, isEdge: false, isThrone: false, occupied: null},
  {boardIdx: 109, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  
  {boardIdx: 110, isRefuge: true, isEdge: true, isThrone: false, occupied: null},
  {boardIdx: 111, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  {boardIdx: 112, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  {boardIdx: 113, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 114, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 115, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 116, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 117, isRefuge: false, isEdge: true, isThrone: false, occupied: 1},
  {boardIdx: 118, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  {boardIdx: 119, isRefuge: false, isEdge: true, isThrone: false, occupied: null},
  {boardIdx: 120, isRefuge: true, isEdge: true, isThrone: false, occupied: null},
  ]
  turn = 1
  winner = false
  render()
  updateMessage()
}

function handleClick(evt){
  //Square index
  sq = evt.target
  if (Math.sign(board[sq.id.slice(2,5)].occupied) !== turn && clickCount === 0){
    clickCount = 0
    return
  }
  //If the piece grabber click hasnt happened
  if (clickCount === 0){
    firstClickId = +evt.target.id.slice(2,5);
    firstClick = board[firstClickId].occupied
    //run first click
    clickOne(firstClickId)
    // render()
    //increment clickcount
    clickCount++
    return
    //If the piece grabber click has happened
  } if (clickCount === 1) {
    secondClickId = +evt.target.id.slice(2,5);
    //run secondclick
    placePiece(firstClick, secondClickId, firstClickId)
    //reset click count, update the message, change the turn
    clickCount = 0

    checkLeftCapture()
    checkRightCapture()
    checkUpCapture()
    checkDownCapture()
    checkForKingCapture()
    checkForDarkWinner()
    whitePieceSurround()
    updateMessage()
    checkWinner()
  }
}
function clickOne(firstClickId){
  board[firstClickId].occupied = null
  // render()
}

function placePiece(firstClick, secondClickId){
  if (checkValidMoves(secondClickId) === true){
    board[secondClickId].occupied = Number(firstClick)
    turn *= -1
    render()
  } else {
    board[firstClickId].occupied = firstClick
    render()
  }
}

function checkValidMoves(secondClickId){
  secondClickId = +secondClickId
  //checks if space is occupied
  if (board[secondClickId].occupied === -1 || board[secondClickId].occupied === 1 || board[secondClickId].occupied === -2 || board[secondClickId].isThrone === true){
    invalidEl.innerText = "Invalid move!"
    return false
  } 
  if (!squareChecker(secondClickId)){
    validMoves = []
    return false
  }
  else {
    invalidEl.innerText = ""
    validMoves = []
    return true
  }
}
  //Checks to make sure move is on a valid square
  function squareChecker(){
  //left side checker
  for (let i = 1; i < 11; i++){
    let leftSide = Number(firstClickId) - i
    if (board[leftSide].occupied || rightEdgeIndex.includes(leftSide) || board[leftSide].isRefuge){
      break
    }
    validMoves.push(leftSide)
  }
  //Right side checker
  for (let i = 1; i < 11; i++){
    let rightSide = Number(firstClickId) + i
    if (board[rightSide].occupied || leftEdgeIndex.includes(rightSide) || board[rightSide].isRefuge){
      break
    }
    validMoves.push(rightSide)
  }
  //Top side checker
  for (let i = 1; i < 11; i++){
    let topSide = Number(firstClickId) - (i * 11)
    if (topSide < 0 || board[topSide].occupied || bottomEdgeIndex.includes(topSide) || board[topSide].isRefuge){
      break
    }
    validMoves.push(topSide)
  }
  //bottom side checker
  for (let i = 1; i < 11; i++){
    let bottomSide = Number(firstClickId) + (i * 11)
    if (bottomSide > 120 || board[bottomSide].occupied || topEdgeIndex.includes(bottomSide) || board[bottomSide].isRefuge){
      break
    }
    validMoves.push(bottomSide)
  }
  if (firstClick === -2){
    refugeSquares.forEach(function (sq){
      validMoves.push(sq)
    })
  }
  if (validMoves.includes(secondClickId)){
    return true
  } else {
    return false
  }
}
  //! ----------------------Render Functionality------------------------------
  function render(){
  updateBoard()
}

function updateBoard(){
  board.forEach(function(value, idx) {
    value = squareEls[idx]
    if (board[idx].occupied === null){
      value.innerText = ""
    }
    else if (board[idx].occupied === 1){
      value.innerText = "1"
    }
    else if (board[idx].occupied === -1){
      value.innerText = "-1"
    }
    else if (board[idx].occupied === -2){
      value.innerText = "K"
    }
    })
};

function updateMessage() {
  if (turn === 1){
    messageEl.innerText = "It's player one's turn!"
  } else {
    messageEl.innerText = "Its player two's turn!"
  }
}

function checkWinner(){
  if (winner === true){
    if (turn === 1){
    messageEl.innerText = `Player two wins!`
    }else {
      messageEl.innerText = `Player one wins!`
    }
  }
}
//! ------------------Hover functionality---------------------
function possibleMoves(evt) {
  squareEls.forEach(function (el) {
  el.style.background ="black"
})
  hoverTarget = evt.target
  if (hoverTarget.innerText === "1" || hoverTarget.innerText === "-1" || hoverTarget.innerText === "K"){
    hoverTarget.style.background ="grey"
    let boardEdge = hoverTarget.id.slice(2,5)
    if (board[boardEdge].isEdge){
      moveEdgePiece(evt, hoverTarget)}
    else {
      moveInnerPiece(evt, hoverTarget)}
  }
}

function moveEdgePiece(evt, hoverTarget){
  //Left side possible moves
  for (let i = 0; i < 11; i++){
    let leftPiece = +hoverTarget.id.slice(2,5)
    if (leftEdgeIndex.includes(leftPiece)){
      break
    }
    leftPiece = Number(leftPiece) - i
    squareEls[leftPiece].style.background="grey"
    if (board[leftPiece].isRefuge === true || board[leftPiece - 1].occupied){
      break
    }
  }
  //Right side possible moves
  for (let i = 0; i < 11; i++){
    let rightPiece = +hoverTarget.id.slice(2,5)
    if (rightEdgeIndex.includes(rightPiece)){
      break
    }
    rightPiece = Number(rightPiece) + i
    squareEls[rightPiece].style.background="grey"
    if (board[rightPiece].isRefuge === true || board[rightPiece + 1].occupied){
      break
    }
  }

 //Below possible moves
  let belowPiece = +hoverTarget.id.slice(2,5)
  for (let i = 0; i < 11; i++){
    if (belowPiece > 110) {
      break
    }
    if (board[belowPiece].isRefuge === true || board[belowPiece + 11].occupied){
      break
    }
    belowPiece = Number(belowPiece) + 11
    squareEls[belowPiece].style.background="grey"
  }

    //Above possible moves
    let abovePiece = +hoverTarget.id.slice(2,5)
    for (let i = 0; i < 11; i++){
      if (abovePiece < 10) {
        return
      }
      if (board[abovePiece].isRefuge === true || board[abovePiece - 11].occupied){
        break
      }
      abovePiece = Number(abovePiece) - 11
      squareEls[abovePiece].style.background="grey"
    }
}

function moveInnerPiece(evt, hoverTarget){
  //Left side possible moves
  for (let i = 0; i < 10; i++){
    let leftPiece = +hoverTarget.id.slice(2,5)
    leftPiece = Number(leftPiece) - i
    squareEls[leftPiece].style.background="grey"
    if (board[leftPiece].isEdge === true || board[leftPiece - 1].occupied){
      break
    }
  }
  //Right side possible moves
  for (let i = 0; i < 10; i++){
    let rightPiece = +hoverTarget.id.slice(2,5)
    rightPiece = Number(rightPiece) + i
    squareEls[rightPiece].style.background="grey"
    if (board[rightPiece].isEdge === true || board[rightPiece + 1].occupied){
      break
    }
  }

 //Below possible moves
  let belowPiece = +hoverTarget.id.slice(2,5)
  for (let i = 0; i < 11; i++){
    if (board[belowPiece].isEdge === true || board[belowPiece + 11].occupied){
      break
    }
    belowPiece = Number(belowPiece) + 11
    squareEls[belowPiece].style.background="grey"
  }

    //Above possible moves
    let abovePiece = +hoverTarget.id.slice(2,5)
    for (let i = 0; i < 11; i++){
      if (board[abovePiece].isEdge === true || board[abovePiece - 11].occupied){
        break
      }
      abovePiece = Number(abovePiece) - 11
      squareEls[abovePiece].style.background="grey"
    }
  }


  //! ----------------------------Check for capture---------------------------------------
function checkLeftCapture(){
  if (secondClickId === 1){
    return
  }
  let left = board[secondClickId - 1];
  let leftX2 = board[secondClickId - 2]
  if (leftEdgeIndex.includes(left.boardIdx) || leftEdgeIndex.includes(board[secondClickId].boardIdx)){
    return
  }
  //player one which here is 1
  if (turn === -1){
    if (left.occupied === -2 || leftX2.occupied === -2){
      return
    }
    if (leftX2.occupied === 1 && left.occupied === -1){
      left.occupied = null
    }
    if ((leftX2.occupied === null && leftX2.isThrone) || (leftX2.isRefuge === true && left.occupied === -1)){
      left.occupied = null
    }
  }
  if (turn === 1){
    if (leftX2.occupied === -1 && left.occupied === 1){
        left.occupied = null
      }
    if ((leftX2.occupied === null && leftX2.isThrone) || (leftX2.isRefuge === true && left.occupied === 1)){
      left.occupied = null
    }
    }
  render()
}

function checkRightCapture(){
  if (secondClickId === 119){
    return
  }
  let right = board[secondClickId + 1];
  let rightX2 = board[secondClickId + 2]
  if (rightEdgeIndex.includes(right.boardIdx)|| rightEdgeIndex.includes(board[secondClickId].boardIdx)){
    return
  }
  if (turn === -1){
    if (right.occupied === -2 || rightX2.occupied === -2){
      return
    }
    if (rightX2.occupied === 1 && right.occupied === -1){
      right.occupied = null
    }
    if ((rightX2.occupied === null && rightX2.isThrone) || (rightX2.isRefuge === true && right.occupied === -1)){
      right.occupied = null
    }
  }
  if (turn === 1){
    if (rightX2.occupied === -1 && right.occupied === 1){
      right.occupied = null
    }
    if ((rightX2.occupied === null && rightX2.isThrone) || (rightX2.isRefuge === true && right.occupied === 1)){
      right.occupied = null
    }
    }
  render()
  }

function checkUpCapture(){
  if (board[secondClickId].boardIdx < 22){
    return
  }
  let up = board[secondClickId - 11]
  let upX2 = board[secondClickId - 22]
  if (topEdgeIndex.includes(up.boardIdx) || topEdgeIndex.includes(board[secondClickId].boardIdx)){
    return
  }
  if (turn === -1){
    if (up.occupied === -2 || upX2.occupied === -2){
      return
    }
    if (upX2.occupied === 1 && up.occupied === -1){
      up.occupied = null
    }
    if ((upX2.occupied === null && upX2.isThrone) || (upX2.isRefuge === true && up.occupied === -1)){
      up.occupied = null
    }
  }
  if (turn === 1){
    if (upX2.occupied === -1 && up.occupied === 1){
      up.occupied = null
    }
    if ((upX2.occupied === null && upX2.isThrone) || (upX2.isRefuge === true && up.occupied === 1)){
      up.occupied = null
    }
  }
  render()
}

function checkDownCapture(){
  if (board[secondClickId].boardIdx > 98){
    return
  }
  let down = board[secondClickId + 11]
  let downX2 = board[secondClickId + 22]
  if (bottomEdgeIndex.includes(down.boardIdx) || bottomEdgeIndex.includes(board[secondClickId].boardIdx)){
    return
  }
  if (turn === -1){
    if (down.occupied === -2 || downX2.occupied === -2){
      return
    }
    if (downX2.occupied === 1 && down.occupied === -1){
      down.occupied = null
    }
    if ((downX2.occupied === null && downX2.isThrone) || (downX2.isRefuge === true && down.occupied === -1)){
      down.occupied = null
    }
  }
  if (turn === 1){
    if (downX2.occupied === -1 && down.occupied === 1){
      down.occupied = null
    }
    if ((downX2.occupied === null && downX2.isThrone) || (downX2.isRefuge === true && down.occupied === 1)){
      down.occupied = null
    }
  }
  render()
}

//! -----------------------Check for winner-------------------
function checkForDarkWinner(){
  refugeSquares.forEach(function (square){
    if (board[square].occupied === -2){
      winner = true
    }
  })
}





//! -----------------------King capture function---------------
function checkForKingCapture(){
  let kingSquare
  for (let i = 0; i < board.length; i++){
    if (board[i].occupied === -2){
      kingSquare = board[i].boardIdx
      if (kingSquare > 10 && kingSquare < 109){
        checkFullKingCapture()
        leftSideKingCapture()
        rightSideKingCapture()
      }
      if (kingSquare < 10){
        topSideKingCapture()
      }
      if (kingSquare > 109){
        bottomSideKingCapture()
      }
    }
  }
}

function checkFullKingCapture(){
  for (let i = 0; i < board.length; i++){
    if (board[i].occupied === -2){
      //Case for a king that is surrounded on the four sides
      if ((board[i - 1].isThrone === true || board[i - 1].occupied === 1)
      && (board[i + 1].isThrone === true || board[i + 1].occupied === 1) 
      && (board[i - 11].isThrone === true ||board[i - 11].occupied === 1)
      && (board[i + 11].isThrone === true ||board[i + 11].occupied === 1)){
        winner = true
        return
      }
    }
  }
}
// Case for a king on the right edge
function rightSideKingCapture(){
  for (let i = 0; i < board.length; i++){
    if (board[i].occupied === -2){
      if (board[i - 1].occupied === 1 && board[i - 11].occupied === 1 && board[i + 11].occupied === 1 && rightEdgeIndex.includes(board[i].boardIdx)){
        winner = true
        return
      }
    }
  }
}
//Case for a king trapped on the top edge
function topSideKingCapture(){
  for (let i = 0; i < board.length; i++){
    if (board[i].occupied === -2){
      if (board[i - 1].occupied === 1 && board[i + 1].occupied === 1 && board[i + 11].occupied === 1 && topEdgeIndex.includes(board[i].boardIdx)){
        winner = true
        return
      }
    }
  }
}
//Case for a king trapped on the bottom edge
function bottomSideKingCapture(){
  for (let i = 0; i < board.length; i++){
    if (board[i].occupied === -2){
      if (board[i - 1].occupied === 1 && board[i - 1].occupied === 1 && board[i - 11].occupied === 1 && bottomEdgeIndex.includes(board[i].boardIdx)){
        winner = true
        return
      }
    }
  }
}
//Case for a king trapped on the left edge
function leftSideKingCapture(){
  for (let i = 0; i < board.length; i++){
    if (board[i].occupied === -2){
      if (board[i + 1].occupied === 1 && board[i - 11].occupied === 1 && board[i + 11].occupied === 1 && leftEdgeIndex.includes(board[i].boardIdx)){
        winner = true
        return
      }
    }
  }
}

//! ------------------ White piece surrounded -------------

function whitePieceSurround(){
  for (let i = 0; i < board.length; i++){
    if (board[i].occupied === -1 || board[i].occupied === -2){
      whitePieces.push(board[i].boardIdx)
    }
  }
  whitePieces.forEach(function (square){
    for (let i = 1; i < 11; i++){
      let leftSide = Number(square) - i
      if (board[leftSide].occupied || rightEdgeIndex.includes(leftSide) || board[leftSide].isRefuge){
        break
      }
      whiteTotalValidMoves.push(leftSide)
    }
    //Right side checker
    for (let i = 1; i < 11; i++){
      let rightSide = Number(square) + i
      if (board[rightSide].occupied || leftEdgeIndex.includes(rightSide) || board[rightSide].isRefuge){
        break
      }
      whiteTotalValidMoves.push(rightSide)
    }
    //Top side checker
    for (let i = 1; i < 11; i++){
      let topSide = Number(square) - (i * 11)
      if (topSide < 0 || board[topSide].occupied || bottomEdgeIndex.includes(topSide) || board[topSide].isRefuge){
        break
      }
      whiteTotalValidMoves.push(topSide)
    }
    //bottom side checker
    for (let i = 1; i < 11; i++){
      let bottomSide = Number(square) + (i * 11)
      if (bottomSide > 120 || board[bottomSide].occupied || topEdgeIndex.includes(bottomSide) || board[bottomSide].isRefuge){
        break
      }
      whiteTotalValidMoves.push(bottomSide)
    }
  })
  if (whiteTotalValidMoves.length === 0){
    winner = true
    console.log(winner);
  } else {
    whiteTotalValidMoves = []
    whitePieces = []
  }
}
