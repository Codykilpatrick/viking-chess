
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
    console.log(board);
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
    else if (board[idx].occupied === "K"){
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
  if (hoverTarget.innerText === "1"){
    console.log(hoverTarget);
    hoverTarget.style.background ="grey"
  }
}