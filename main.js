
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
});

const Display = (() => {
    let playerX = Player("Player X", "X");
    let playerY = Player("Player Y", "Y");

    
})