const cellElement = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winning-mesasge");
const restart = document.getElementById("restart-button");
const winningMesasgeText = document.querySelector(".winning");
const WINNINGCOMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// const X_CLASS = "x";
// const CIRCLE_CLASS = "circle";
let circleTurn;
startGame();
function startGame() {
  circleTurn = true;
  cellElement.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setHoverClass();
  winningMessage.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? "circle" : "x";
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMesasgeText.innerText = "Draw!";
  } else {
    winningMesasgeText.innerText = `${circleTurn ? "O's" : "X's"} Wins`;
  }
  winningMessage.classList.add("show");
}

function isDraw() {
  return [...cellElement].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
}
function setHoverClass() {
  board.classList.remove("x");
  board.classList.remove("circle");
  if (circleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurn() {
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  return WINNINGCOMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElement[index].classList.contains(currentClass);
    });
  });
}

restart.addEventListener("click", startGame);
