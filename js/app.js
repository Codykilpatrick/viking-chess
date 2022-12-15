
/*-------------------------------- Constants -----------------------------*/

import {board} from "./board.js"

/*-------------------------------- Variables -----------------------------*/
let turn, winner, tie, player


/*------------------------ Cached Element References ---------------------*/

const squareEls = document.querySelectorAll(".sqr")
const resetBtnEl = document.querySelector("button")

/*----------------------------- Event Listeners --------------------------*/

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
  const sqIdx = evt.target.id.slice(2,5);
  const sq = evt.target
  console.log(sqIdx);
  console.log(sq);
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
