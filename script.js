const Gameboard = (function() {
    const boardArr = ['', '', '', '', '', '', '', '', ''];
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
            const is3InRow = Gameboard.check3InRow();
            if (is3InRow) {
                console.log(`${getNameFromMark(is3InRow)} wins.`);;
            } else if (Gameboard.checkDraw()) {
                console.log('draw');
            }
        }
        turn++;
    };
    const renderBoard = function(board) {
        const boardContainer = document.querySelector('.board-container');
        for (let i = 0; i < 9; i++) {
            let spot = document.createElement('div');
            spot.setAttribute('data-key', i);
            spot.className = 'spot';
            boardContainer.appendChild(spot);
        }
        spots = document.querySelectorAll('.spot');
        spots.forEach(spot => spot.addEventListener('click', playerClicked));
    };
    return {
        renderBoard
    };
})();
const player = [Player('Felix', 'X'), Player('Sean', 'O')];
DisplayController.renderBoard([]);