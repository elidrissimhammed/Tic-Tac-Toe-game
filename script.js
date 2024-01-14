let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function createBoard() {
    const boardElement = document.getElementById('board');

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => cellClick(i));
        boardElement.appendChild(cell);
    }
}

function cellClick(index) {
    if (!gameActive || board[index] !== '') {
        return;
    }

    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].innerText = currentPlayer;
    
    if (checkWin()) {
        displayResult(`Player ${currentPlayer} wins!`);
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        displayResult("It's a tie!");
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentPlayer)
    );
}

function displayResult(message) {
    const resultElement = document.getElementById('result');
    resultElement.innerText = message;
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach(cell => {
        cell.innerText = '';
    });

    document.getElementById('result').innerText = '';
}

window.onload = () => {
    createBoard();
};
