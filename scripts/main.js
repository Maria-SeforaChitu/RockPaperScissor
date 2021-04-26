const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const userScoreSpan = document.querySelector("[data-user-score]");
const computerScoreSpan = document.querySelector("[data-computer-score]");
const userResultDiv = document.querySelector("[user-result]");
const computerResultDiv = document.querySelector("[computer-result]");
const SELECTIONS = [
  {
    name: "rock",
    emoji: "✊",
    beats: "scissors",
  },
  {
    name: "paper",
    emoji: "✋",
    beats: "rock",
  },

  {
    name: "scissors",
    emoji: "✌️",
    beats: "paper",
  },
];

selectionButtons.forEach((selectionButtons) => {
  selectionButtons.addEventListener("click", (e) => {
    const selectionName = selectionButtons.dataset.selection;
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    );

    play(selection);
  });
});

function play(userSelection) {
  const computerSelection = randomSelection();

  computeGameResult(userSelection, computerSelection);
}

function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}

function computeGameResult(userSelection, computerSelection) {
  const userResult = compareSelections(userSelection, computerSelection);

  userResultDiv.innerText = userSelection.emoji;
  userResultDiv.classList.remove("winner");
  computerResultDiv.innerText = computerSelection.emoji;
  computerResultDiv.classList.remove("winner");

  let resultLog = "It's a draw!";
  if (userResult == 1) {
    userResultDiv.classList.add("winner");
    incrementScore(userScoreSpan);
    resultLog = "User wins!";
  } else if (userResult == -1) {
    computerResultDiv.classList.add("winner");
    incrementScore(computerScoreSpan);
    resultLog = "Computer wins!";
  }

  console.log('User picked: "' + userSelection.name + '"');
  console.log('Computer picked: "' + computerSelection.name + '"');
  console.log("Result: " + resultLog);
}

function compareSelections(selection, opponentSelection) {
  if (selection.beats === opponentSelection.name) {
    return 1;
  } else if (opponentSelection.beats === selection.name) {
    return -1;
  }
  return 0;
}

function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}
