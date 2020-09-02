let button = document.getElementById("start");
let turns = document.getElementById("turn");
let gameCell = document.querySelectorAll(".game-coloum");
let gameStart = true;
let whosTurn = true;
let players = [];

const startGame = () => {
    let player1 = document.getElementById("player1").value;
    let player2 = document.getElementById("player2").value;
    if (isEmpty(player1, player2)) { // || isEmpty(player2)) {
        alert("Please enter valid player names.");
        return;
    } else {
        let classname = document.getElementById("remove");
        classname.classList.remove("hide");
        let input1 = document.getElementById("player1");
        let input2 = document.getElementById("player2");
        input1.setAttribute("disabled", true);
        input2.setAttribute("disabled", true);
        button.setAttribute("disabled",true);
        players.push(player1);
        players.push(player2);
        document.getElementById("turn").innerHTML = `${player1}'s turn to play.`;
    }
}

// const isEmpty = (player) => !player || !player.trim();
const isEmpty = (value1, value2) => {
    if (value1.trim() === "" || value2.trim() === "") {
        return true;
    } else {
        return false;
    }
}

const gameStatus = () => {
    let topLeft = gameCell[0].classList[2];
    let middleLeft = gameCell[1].classList[2];
    let bottomLeft = gameCell[2].classList[2];
    let topMiddle = gameCell[3].classList[2];
    let middleMiddle = gameCell[4].classList[2];
    let bottomMiddle = gameCell[5].classList[2];
    let topRight = gameCell[6].classList[2];
    let middleRight = gameCell[7].classList[2];
    let bottomRight = gameCell[8].classList[2];

    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
        getWinner(topLeft);
    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        getWinner(middleLeft);
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        getWinner(bottomLeft);
    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        getWinner(topLeft);
    } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        getWinner(topMiddle);
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        getWinner(topRight);
    } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        getWinner(topLeft);
    } else if (bottomLeft && bottomLeft === middleMiddle && bottomLeft === topRight) {
        getWinner(bottomLeft);
    } else if (topLeft && middleLeft && bottomLeft && topMiddle && middleMiddle && bottomMiddle && topRight && middleRight && bottomRight) {
        gameStart = false;
        document.getElementById("turn").innerHTML = `Match draw. Restart to play again.`;
    } else {
        whosTurn = !whosTurn;
        if (whosTurn) {
            document.getElementById("turn").innerHTML = `${players[0]}'s turn to play.`;
        } else {
            document.getElementById("turn").innerHTML = `${players[1]}'s turn to play.`;
        }
    }
}

const getWinner = (name) => {
    gameStart = false;
    if (name === 'X') {
        document.getElementById("turn").innerHTML = `${players[0]} won. Restart to play.`;
    } else {
        document.getElementById("turn").innerHTML = `${players[1]} won. Restart to play.`;
    }
}

const handleClik = (e) => {
    const classList = e.target.classList;
    if (classList[2] === "X" || classList[2] === "O" || gameStart === false) {
        return;
    }
    if (whosTurn === true) {
        classList.add("X");
        gameStatus();
    } else {
        classList.add("O");
        gameStatus();
    }
}

for (let eachCell of gameCell) {
    eachCell.addEventListener("click", handleClik);
}
button.addEventListener("click", startGame);