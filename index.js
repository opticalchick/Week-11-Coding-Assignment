const cells = document.querySelectorAll(".cell");
const infoText = document.querySelector("#infoText");
const restartBtn = document.querySelector("#restartBtn");
//This sets the array of possible winning combinations
const winCriteria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

startGame();

function startGame() {
    //this sets a click event listener for each cell in the game
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    //this is the event listener for the game start button and will run the 
    //restart game function
    restartBtn.addEventListener("click", restartGame);
    //displays below game board which player's turn it is
    infoText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    //gets the index of the cell clicked
    const cellIndex = this.getAttribute("cellIndex");
    //checks to see whether or not the cell is empty
    if (options[cellIndex] != "" || !running) {
        return;
    }
    // if cell was empty, runs updateCel function, populates player's icon, and
    // runs checkWinner function
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    //takes in the cell and its index, assigns currentPlayer icon to cell
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    //changes player after cell selection and updates h2 with which player's turn
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    infoText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    //function runs loop through cells to see if winning criteria has been met from 
    // array variable set above
    for (let i = 0; i < winCriteria.length; i++) {
        const criteria = winCriteria[i];
        const cellA = options[criteria[0]];
        const cellB = options[criteria[1]];
        const cellC = options[criteria[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    //displays alert with which player won, whether or not it's a draw, ends
    //if either of those conditions are met, and if no winner this round, 
    //switches player to continue game
    if (roundWon) {
        alert(`${currentPlayer} wins!`);
        running = false;
    }
    else if (!options.includes("")) {
        alert(`It's a draw!`);
        running = false;
    }
    else {
        changePlayer();
    }
}
//restarts game and resets game board
function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    infoText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}