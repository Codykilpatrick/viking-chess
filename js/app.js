
/*-------------------------------- Constants -----------------------------*/

import {board} from "./board.js"

const rightEdgeIndex = [21, 32, 43, 54, 65, 76, 87, 98, 109]
const leftEdgeIndex = [11, 22, 33, 44, 55, 66, 77, 88, 99]
const topEdgeIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const bottomEdgeIndex = [111, 112, 113, 114, 115, 116, 117, 118, 119]
const refugeSquares = [0, 10, 110, 120]

/*-------------------------------- Variables -----------------------------*/
let turn, winner, tie, player, firstClickId, secondClickId, hoverTarget, sq
let firstClick = ''
let clickCount = 0 
let validMoves = []

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
  turn = 1
  winner = false
  render()
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
    checkForDarkWinner()
    updateMessage()
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
  //player one which here is 1
  if (turn === -1){
    let left = board[secondClickId - 1];
    if (left.boardIdx === 0){
      return
    }
    let leftX2 = board[secondClickId - 2]
    if (leftEdgeIndex.includes(left.boardIdx) || leftEdgeIndex.includes(board[secondClickId].boardIdx)){
      return
    }
    if (leftX2.occupied === 1 && left.occupied === -1){
      left.occupied = null
    }
  }
  if (turn === 1){
    let left = board[secondClickId - 1];
    if (left.boardIdx === 0){
      return
    }
    let leftX2 = board[secondClickId - 2]
    if (leftEdgeIndex.includes(left.boardIdx) || leftEdgeIndex.includes(board[secondClickId].boardIdx)){
      return
    }
    if (leftX2.occupied === -1 && left.occupied === 1){
        left.occupied = null
      }
    }
  render()
}

function checkRightCapture(){
  if (turn === -1){
    let right = board[secondClickId + 1];
    if (right.boardIdx === 120){
      return
    }
    let rightX2 = board[secondClickId + 2]
    if (rightEdgeIndex.includes(right.boardIdx)|| rightEdgeIndex.includes(board[secondClickId].boardIdx)){
      return
    }
    if (rightX2.occupied === 1 && right.occupied === -1){
      right.occupied = null
    }
  }
  if (turn === 1){
    let right = board[secondClickId + 1];
    if (right.boardIdx === 120){
      return
    }
    let rightX2 = board[secondClickId + 2]
    if (rightEdgeIndex.includes(right.boardIdx) || rightEdgeIndex.includes(board[secondClickId].boardIdx)){
      return
    }
    if (rightX2.occupied === -1 && right.occupied === 1){
        right.occupied = null
      }
    }
  render()
  }

function checkUpCapture(){
  if (turn === -1){
    if (board[secondClickId].boardIdx < 22){
      return
    }
    let up = board[secondClickId - 11]
    let upX2 = board[secondClickId - 22]
    if (topEdgeIndex.includes(up.boardIdx) || topEdgeIndex.includes(board[secondClickId].boardIdx)){
      return
    }
    if (upX2.occupied === 1 && up.occupied === -1){
      up.occupied = null
    }
  }
  if (turn === 1){
    if (board[secondClickId].boardIdx < 22){
      return
    }
    let up = board[secondClickId - 11]
    let upX2 = board[secondClickId - 22]
    if (topEdgeIndex.includes(up.boardIdx) || topEdgeIndex.includes(board[secondClickId].boardIdx)){
      return
    }
    if (upX2.occupied === -1 && up.occupied === 1){
      up.occupied = null
    }
  }
  render()
}

function checkDownCapture(){
  let down = board[secondClickId + 11]
  let downX2 = board[secondClickId + 22]
  if (bottomEdgeIndex.includes(down.boardIdx) || bottomEdgeIndex.includes(board[secondClickId].boardIdx) || board[secondClickId].boardIdx > 97){
    return
  }
  if (turn === -1){
    if (downX2.occupied === 1 && down.occupied === -1){
      down.occupied = null
    }
  }
  if (turn === 1){
    if (downX2.occupied === -1 && down.occupied === 1){
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