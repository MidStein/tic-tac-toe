const Gameboard = (function() {
    const boardArr = [];
    const getBoardAtIndex = function(index) {
        return boardArr[index];
    }
    const setBoardAtIndex = function(index, mark) {
        boardArr[index] = mark;
    }
    const check3InRow = function() {
        for (key of [0, 3, 6]) {
            if (boardArr[key] !== '' &&boardArr[key] === boardArr[key + 1] && boardArr[key + 1] === boardArr[key + 2]) 
                return boardArr[key];
        }
        if (boardArr[2] !== '' && boardArr[2] === boardArr[4] && boardArr[4] === boardArr[6]) 
            return boardArr[2];
        for (key of [0, 1, 2]) {
            if (boardArr[key] !== '' && boardArr[key] === boardArr[key + 3] && boardArr[key + 3] === boardArr[key + 6]) 
                return boardArr[key];
        }
        if (boardArr[0] !== '' && boardArr[0] === boardArr[4] && boardArr[4] === boardArr[8]) 
            return boardArr[0];
        return null;        
    }
    const checkDraw =  function() {
        return !boardArr.includes('');
    };
    return {
        getBoardAtIndex,
        setBoardAtIndex,
        check3InRow,
        checkDraw
    };
})();
const Player = function(plName, plMark) {
    const getPlName = function() {
        return plName;
    };
    const getPlMark = function() {
        return plMark;
    };
    return {
        getPlName,
        getPlMark
    };
};
const DisplayController = (function() {
    let spots, turn = 0;
    let player;
    const boardContainer = document.querySelector('.board-container');
    const lines = document.querySelectorAll('.line');
    const getNameFromMark = function(mark) {
        for (let i = 0; i < player.length; i++) {
            if (player[i].getPlMark() == mark) {
                return player[i].getPlName();
            }
        }
    }
    const playerClicked = function() {
        if (Gameboard.getBoardAtIndex(this.getAttribute('data-key')) !== '') return;
        if (turn % 2 === 0) {
            this.style.color = '#f87171';
            this.textContent = 'X';
            Gameboard.setBoardAtIndex(this.getAttribute('data-key'), 'X');
        } else {
            this.style.color = '#60a5fa';
            this.textContent = 'O';
            Gameboard.setBoardAtIndex(this.getAttribute('data-key'), 'O');
        }
        if (turn >= 4) {
            let isGameOver = false;
            const is3InRow = Gameboard.check3InRow();
            if (is3InRow) {
                document.querySelector('.winner-congo').textContent = `Congratulations to ${getNameFromMark(is3InRow)} for winning the game`;
                isGameOver = true;
            } else if (Gameboard.checkDraw()) {
                document.querySelector('.winner-congo').textContent = `Draw`;
                isGameOver = true;
            }
            if (isGameOver) {
                document.querySelector('.menu').style.visibility = 'visible';
                document.querySelector('.winner-congo').style.visibility = 'visible';
                window.setTimeout(() => {
                    boardContainer.style.visibility = 'hidden';
                    spots.forEach(spot => spot.textContent = '');
                }, 1000);
                lines.forEach(line => line.style.backgroundColor = '#4ade80');
                pl1Name = document.querySelector('input#pl1Name').value = '';
                pl2Name = document.querySelector('input#pl2Name').value = '';
            }
        }
        turn++;
    };
    const renderBoard = function() {
        for (let i = 0; i < 9; i++) {
            let spot = document.createElement('div');
            spot.setAttribute('data-key', i);
            spot.className = 'spot';
            boardContainer.appendChild(spot);
        }
        spots = document.querySelectorAll('.spot');
        spots.forEach(spot => spot.addEventListener('click', playerClicked));
    };
    const startGame = function() {
        document.querySelector('.winner-congo').style.visibility = 'hidden';
        start.textContent = 'Restart Game';
        document.querySelector('.menu').style.visibility = 'hidden';
        lines.forEach(line => line.style.backgroundColor = '#000');
        for (let i = 0; i < 9; i++) {
            Gameboard.setBoardAtIndex(i, '');
        }
        boardContainer.style.visibility = 'visible';
        const pl1Name = document.querySelector('input#pl1Name').value;
        const pl2Name = document.querySelector('input#pl2Name').value;
        player = [Player(pl1Name, 'X'), Player(pl2Name, 'O')];
        turn = 0;
        renderBoard();
    };
    return {
        startGame
    }
})();
const start = document.querySelector('.menu > button');
start.addEventListener('click', DisplayController.startGame);