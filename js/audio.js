let clickSound = new Audio('../sounds/place-piece.mp3')
let winnerSound = new Audio('../sounds/winner.mp3')

function playClickSound() {
  clickSound.play()
}
function playWinnerSound() {
  winnerSound.play()
}

export {
  playClickSound,
  playWinnerSound
}