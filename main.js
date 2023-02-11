const startBtn = document.querySelector('.start');

const gameBoard = (function() {
    let board = [
        ["","",""],
        ["","",""],
        ["","",""],
    ];
    return{board};
})();


const player = function(name, mark) {
    this.name = name;
    this.mark = mark;
    return{name, mark}
}


const ticTacToe = (function() {
    let player1 = player("Player X", "X");
    let player2 = player("Player O", "O");

    const cells = document.querySelectorAll('.cell');
    const gameMessage = document.querySelector('.gameMessage');

    let playerTurn = player1.mark;

    
    const toggleTurn = function() {
        if(playerTurn === player1.mark) {playerTurn = player2.mark}
        else if(playerTurn === player2.mark) {playerTurn = player1.mark}
    }

   
    const updateBoard = function() {
        let i = 0;
        let j =  0;
        cells.forEach(cell => {
            if(j > 2) {
                j = 0;
                i++
            }
            gameBoard.board[i][j] = cell.textContent;
            j++
        })
    }

  
    const addMark = function(e) {
        if(e.target.textContent === "") {
            if(playerTurn === "O") {
                e.target.style.color = "#f59e0b";
            } else {
                e.target.style.color = "#3b82f6";
            }
            e.target.textContent = playerTurn;
            updateBoard();
            toggleTurn();
            checkGameState();
        }
    }

  
    const setBoard = function() {
        playerTurn = player1.mark;
        if(startBtn.textContent === "Start Game") {
            player1 = player((document.querySelector('#playerOne').value !== "")? document.querySelector('#playerOne').value: "X", 'X')
            player2 = player((document.querySelector('#playerTwo').value !== "")? document.querySelector('#playerTwo').value: "O", 'O');
        }
        let i = 0;
        let j = 0;
        cells.forEach(cell => {
            if(j > 2) {
                j = 0;
                i++;
            }
            cell.classList.remove('frozen');
            cell.addEventListener("click", addMark);
            cell.textContent = "";
            gameBoard.board[i][j] = "";
            j++
        })
    }

    const isBoardFull = function() {
        for(let i = 0; i < gameBoard.board.length; i++) {
            for(let j = 0; j < gameBoard.board[i].length; j++) {
                if(gameBoard.board[i][j] === "") {
                    return false;
                }
            }
        }
        return true;
    }

   
    const freezeBoard = function() {
        cells.forEach(cell => {
            cell.removeEventListener("click", addMark);
            cell.classList.add('frozen');
        })
        startBtn.textContent = "Play Again"
        startBtn.style.visibility = 'visible';

    }

    
    const checkGameState = function () {
        let hasWon = false;
        let winMark;
        let winner;

        //check rows for win
        for(let i = 0; i < gameBoard.board.length && !hasWon; i++) {
            if((gameBoard.board[i][0] && gameBoard.board[i][1] && gameBoard.board[i][2]) &&
                gameBoard.board[i][0] === gameBoard.board[i][1] &&
                gameBoard.board[i][1] === gameBoard.board[i][2]) {
                hasWon = true;
                winMark = gameBoard.board[i][0];
            }
        }

        //check columns for win
        for(let i = 0; i < gameBoard.board.length && !hasWon; i++) {
            if((gameBoard.board[0][i] && gameBoard.board[1][i] && gameBoard.board[2][i]) &&
                gameBoard.board[0][i] === gameBoard.board[1][i] &&
                gameBoard.board[1][i] === gameBoard.board[2][i]) {
                hasWon = true;
                winMark = gameBoard.board[0][i];
            }
        }

        //check left diagonal for win
        if((gameBoard.board[0][0] && gameBoard.board[1][1] && gameBoard.board[2][2]) &&
            !hasWon && gameBoard.board[0][0] === gameBoard.board[1][1] &&
            gameBoard.board[1][1] === gameBoard.board[2][2]) {
            hasWon = true;
            winMark = gameBoard.board[0][0];
        }

        //check right diagonal for win
        else if((gameBoard.board[0][2] && gameBoard.board[1][1] && gameBoard.board[2][0]) &&
            !hasWon && gameBoard.board[0][2] === gameBoard.board[1][1] &&
            gameBoard.board[1][1] === gameBoard.board[2][0]) {
            hasWon = true;
            winMark = gameBoard.board[0][2];
        }

        //check for tie
        else if(!hasWon && isBoardFull()) {
            gameMessage.textContent = "Tie game!";
            freezeBoard();
        }

        //win message
        if(hasWon) {
            winner = (winMark === player1.mark)? player1 : player2;
            gameMessage.textContent = winner.name + " has won!";
            freezeBoard();
        }

    }

    
    const startGame = function() {
        setBoard();
        if(startBtn.textContent === "Start Game") {
            document.querySelector('.namesInput').remove();
        }
        gameMessage.textContent = `${player1.name} v.s. ${player2.name}`;
    }

    return{startGame};
})();

//Start game when button is pressed
startBtn.addEventListener("click", (e) => {
    e.target.style.visibility = 'hidden';
    ticTacToe.startGame();
});