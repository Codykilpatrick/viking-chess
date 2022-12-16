
/*-------------------------------- Constants -----------------------------*/

import {board} from "./board.js"

const rightEdgeIndex = [21, 32, 43, 54, 65, 76, 87, 99, 109]
const leftEdgeIndex = [11, 22, 33, 44, 55, 66, 77, 88, 99]

/*-------------------------------- Variables -----------------------------*/
let turn, winner, tie, player, firstClickId, secondClickId, hoverTarget


/*------------------------ Cached Element References ---------------------*/

const squareEls = document.querySelectorAll(".sqr")
const resetBtnEl = document.querySelector("button")

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
  let firstClick = ''
  //Square index
  firstClickId = evt.target.id.slice(2,5);
  //Square HTML element
  const sq = evt.target
  firstClick = sq.innerText
  board[firstClickId].occupied = 0
  render()
  if (firstClick === "1" || firstClick === "-1"){
    placePiece(firstClick)
  }
}

function render(evt){
  updateBoard()
}

function updateBoard(){
  board.forEach(function(value, idx) {
    value = squareEls[idx]
    if (board[idx].occupied === 0){
      value.innerText = ""
    }
    else if (board[idx].occupied === 1){
      value.innerText = "1"
    }
    else if (board[idx].occupied === -1){
      value.innerText = "-1"
    }
    else if (board[idx].occupied === 2){
      value.innerText = "K"
    }
    })
};

function placePiece(firstClick){
  squareEls.forEach(function (el) {
    el.addEventListener('click', function(){
      //The new element id
      secondClickId = el.id.slice(2,5)
      board[secondClickId].occupied = Number(firstClick)
      render()
      firstClick = 0
    })
  })
}

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
  for (let i = 0; i < 10; i++){
    let leftPiece = +hoverTarget.id.slice(2,5)
    if (leftEdgeIndex.includes(leftPiece)){
      break
    }
    if (board[leftPiece].isEdge && board[leftPiece -1].isEdge){
      break
    }
    leftPiece = Number(leftPiece) - i
    squareEls[leftPiece].style.background="grey"
    if (board[leftPiece].isRefuge === true || board[leftPiece - 1].occupied){
      break
    }
  }
  //Right side possible moves
  for (let i = 0; i < 10; i++){
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