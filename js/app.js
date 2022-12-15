
/*-------------------------------- Constants -----------------------------*/
edgeSpaces = []
refugeSpaces = []



/*-------------------------------- Variables -----------------------------*/
let board, turn, winner, tie, player


/*------------------------ Cached Element References ---------------------*/

const squareEls = document.querySelectorAll(".sqr")

/*----------------------------- Event Listeners --------------------------*/

squareEls.forEach(function (el) {
  el.addEventListener('click', handleClick)
})


/*-------------------------------- Functions -----------------------------*/

function handleClick(evt){
  const sqIdx = evt.target.id.slice(2,5);
  sq = evt.target
  console.log(sqIdx);
}