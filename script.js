const Gameboard = (function() {
    const boardArr = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    const getBoard = function() {
        return [...boardArr];
    };
    return {
        getBoard
    }
})();
const Player = function(plName, plMark) {

};
const DisplayController = (function() {
    const renderBoard = function(board) {
        const boardContainer = document.querySelector('.board-container');
        for (let i = 0; i < 9; i++) {
            let spot = document.createElement('div');
            if (board[i] === 'X') {
                spot.classList.add('spot', 'spot-X');
                spot.textContent = 'X';
            } else {
                spot.classList.add('spot', 'spot-O');
                spot.textContent = 'O';
            }
            boardContainer.appendChild(spot);
        }
    }
    return {
        renderBoard
    }
})();
DisplayController.renderBoard(Gameboard.getBoard());