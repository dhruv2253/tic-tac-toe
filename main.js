

const Player = function(name, type) {
    this.name = name;
    this.type = type;

    return {name, type};
};

const GameBoard = (() => {
    let board = [
        "", "", "", 
        "", "", "", 
        "", "", "",
    ];
    
    return {board};
})();


const TicTacToe = (() => {
    let playerX = Player("Player X", "X");
    let playerY = Player("Player O", "O");
    const cells = document.querySelectorAll('.cell');
    const gameMessage = document.querySelector('.gameMessage');
    let playerTurn = playerX.type;

    const toggleTurn = function() {
        if (playerTurn === playerX.type) {
            playerTurn = playerY.type
        }
        else if (playerTurn === playerY.type) {
            playerTurn = playerX.type;
        }
    }

    //add to board
    const addMark = function(e) {
        if (e.target.textContent === ""){
            if (playerTurn === "O"){
                e.target.style.color = "red";
            }
            else {
                e.target.style.color = "blue";
            }
            e.target.textContent = playerTurn;
        }
        console.log("fd");
        toggleTurn();
        updateBoard();
    }
    

    //check board for winner


    // update board
    const updateBoard = function() {
        let i = 0;
        let j = 0;
        cells.forEach(cell => {
            if (j>2){
                j = 0;
                i++;
            }
            GameBoard.board[i][j] = cell.textContent;
            j++;
        })
    }

    // set board
    const setBoard = function() {
        let i = 0;
        let j = 0;
        console.log(cells);
        cells.forEach(cell => {
            if (j>2){
                j = 0;
                i++;
            }
            GameBoard.board[i][j] = "";
            j++;
            console.log(i + " " + j);
            cell.addEventListener('click', addMark);
        });
    }

    // start game
    // const startGame = function() {
    // }
    return {setBoard};
})();

TicTacToe.setBoard();