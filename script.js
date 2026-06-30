const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = true;

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell=>{
    cell.addEventListener("click", cellClicked);
});

resetBtn.addEventListener("click", resetGame);

function cellClicked(){

    const index = this.dataset.index;

    if(board[index] !== "" || !gameRunning){
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function checkWinner(){

    let roundWon = false;

    for(let i=0;i<winningConditions.length;i++){

        const condition = winningConditions[i];

        const a = board[condition[0]];
        const b = board[condition[1]];
        const c = board[condition[2]];

        if(a==="" || b==="" || c===""){
            continue;
        }

        if(a===b && b===c){
            roundWon=true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameRunning = false;
        return;
    }

    if(!board.includes("")){
        statusText.textContent = "Game Draw!";
        gameRunning = false;
        return;
    }

    currentPlayer = currentPlayer==="X" ? "O":"X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame(){

    board = ["","","","","","","","",""];
    currentPlayer="X";
    gameRunning=true;

    statusText.textContent="Player X's Turn";

    cells.forEach(cell=>{
        cell.textContent="";
    });

}