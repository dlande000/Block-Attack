document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.scale(10, 10);

    // create empty starting grid
    function createBoard() {
        const grid = [];
        for (let height = 0; height < 12; height++) {
            grid.push(new Array(6).fill(0));
        }
        return grid;
    }

    const board = createBoard();

    // returns a random block
    function randomBlock() {
        const blocks = "RYGBPS";
        return blocks[Math.floor(Math.random() * 6)];
    }

    // checks a board for clusters of 3 colors
    function checkStartingClusters(board) {
        let checking = true;
        while (checking) {
            checking = false;
            board.forEach((width, y) => {
                width.forEach((value, x) => {
                    if (value !== 0 && y < 10 && x < 4) {
                        if ((value == board[y][x + 1] && value == board[y][x + 2]) || (value == board[y + 1][x] && value == board[y + 2][x])) {
                            board[y][x] = randomBlock();
                            checking = true;
                            console.log(board);
                        }
                    }
                });
            });
        }
    }

    function checkNextRow(row) {
        let checking = true;
        while (checking) {
            checking = false;
            row.forEach((value, i) => {
                if (i < 4 && value == row[i + 1] && value == row[i + 2]) {
                    checking = true;
                    row[i] = randomBlock();
                }
            });
        }
    }

    // updates board with random blocks;
    function createStartingBoard(board) {
        for (let row = 11; row > 6; row--) {
            for (let col = 0; col < 6; col++) {
                board[row][col] = randomBlock();
            }
        }
        checkStartingClusters(board);
        return board;
    }

    const startingBoard = createStartingBoard(board);

    // create upcoming row
    function createNextRow() {
        let nextRow = [];
        for (let i = 0; i < 6; i++) {
            nextRow.push(randomBlock());
        }
        checkNextRow(nextRow);
        return nextRow;
    }

    // swap blocks
    function swap(board, posY, pos1X, pos2X) {
        let a = board[posY][pos1X];
        let b = board[posY][pos2X];
        [a, b] = [b, a];
        board[posY][pos1X] = a;
        board[posY][pos2X] = b;
    }

    // add next row to grid
    function addRowToBoard(row, board) {
        board.shift();
        board.push(row);
    }
});