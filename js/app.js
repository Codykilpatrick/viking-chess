
/*-------------------------------- Constants -----------------------------*/

import {board} from "./board.js"

/*-------------------------------- Variables -----------------------------*/
let turn, winner, tie, player, firstClickId, secondClickId, hoverTarget
let firstClick = 0

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
  //Square index
  firstClickId = evt.target.id.slice(2,5);
  //Square HTML element
  const sq = evt.target
  firstClick = sq.innerText
  if (firstClick === "1" || firstClick === "-1"){
    placePiece(firstClick)
    board[firstClickId].occupied = 0
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
  }
  //Left side possible moves
  for (let i = 0; i < 10; i++){
    let leftPiece = hoverTarget.id.slice(2,5)
    leftPiece = leftPiece - i
    squareEls[leftPiece].style.background="grey"
    if (board[leftPiece].isEdge === true || board[leftPiece - 1].occupied){
      break
    }
  }
  //Right side possible moves
  for (let i = 0; i < 10; i++){
    let rightPiece = hoverTarget.id.slice(2,5)
    rightPiece = Number(rightPiece) + i
    squareEls[rightPiece].style.background="grey"
    if (board[rightPiece].isEdge === true || board[rightPiece + 1].occupied){
      break
    }
  }

  //Below possible moves
  let belowPiece = hoverTarget.id.slice(2,5)
  for (let i = 0; i < 10; i++){
    belowPiece = Number(belowPiece) + 11
    squareEls[belowPiece].style.background="grey"
    if (board[belowPiece].isEdge === true || board[belowPiece + 11].occupied){
      break
    }
  }

    //Above possible moves
    let abovePiece = hoverTarget.id.slice(2,5)
    for (let i = 0; i < 10; i++){
      abovePiece = Number(abovePiece) - 11
      squareEls[abovePiece].style.background="grey"
      if (board[abovePiece].isEdge === true || board[abovePiece - 11].occupied){
        break
      }
    }
}