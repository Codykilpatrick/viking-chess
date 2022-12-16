
/*-------------------------------- Constants -----------------------------*/

import {board} from "./board.js"

/*-------------------------------- Variables -----------------------------*/
let turn, winner, tie, player, firstClick, firstClickId, secondClickId


/*------------------------ Cached Element References ---------------------*/

const squareEls = document.querySelectorAll(".sqr")
const resetBtnEl = document.querySelector("button")

/*----------------------------- Event Listeners --------------------------*/
console.log(firstClick);
document.addEventListener('DOMContentLoaded', init)
squareEls.forEach(function (el) {
  el.addEventListener('click', handleClick)
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
  placePiece(firstClickId, firstClick)
  // if (firstClick === "1" || firstClick === "-1"){
  //   console.log(firstClickId);
    // board[firstClickId].occupied = null
    // firstClick = null
    // return
  // }
  console.log(board);
}

function render(evt){
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
    else if (board[idx].occupied === "K"){
      value.innerText = "K"
    }
    })
};

function placePiece(firstClickId, x){
  if (firstClick === "1" || firstClick === "-1"){
  squareEls.forEach(function (el) {
    el.addEventListener('click', function(){
      //The new element id
      secondClickId = el.id.slice(2,5)
      console.log("Before", board[secondClickId].occupied);
      board[secondClickId].occupied = parseInt(x)
      board[firstClickId].occupied = null
      console.log("After", board[secondClickId].occupied);
      render()
      firstClick = null
      // return
    })
  })
  }}