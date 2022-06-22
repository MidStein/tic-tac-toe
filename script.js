const Gameboard = (function() {
    const boardArr = ['', '', '', '', '', '', '', '', ''];
    // const getBoard = function() {
    //     return [...boardArr];
    // };
    const getBoardAtIndex = function(index) {
        return boardArr[index];
    }
    const setBoardAtIndex = function(index, mark) {
        boardArr[index] = mark;
    }
    return {
        getBoardAtIndex,
        setBoardAtIndex
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
        turn++;
    };
    const renderBoard = function(board) {
        const boardContainer = document.querySelector('.board-container');
        for (let i = 0; i < 9; i++) {
            let spot = document.createElement('div');
            spot.setAttribute('data-key', i);
            spot.className = 'spot';
            // if (board[i] === 'X') {
            //     spot.style.color = '#f87171';
            //     spot.textContent = 'X';
            // } else if(board[i] === 'O') {
            //     spot.style.color = '#60a5fa';
            //     spot.textContent = 'O';
            // }
            boardContainer.appendChild(spot);
        }
        spots = document.querySelectorAll('.spot');
        spots.forEach(spot => spot.addEventListener('click', playerClicked));
    };
    return {
        renderBoard
    };
})();
const player1 = Player('Felix', 'X');
const player2 = Player('Sean', 'O');
DisplayController.renderBoard([]);