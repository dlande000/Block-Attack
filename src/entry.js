document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.scale(10, 10);

    // create starting grid
    function createBoard() {
        const grid = [];
        for (let height = 0; height < 12; height++) {
            grid.push(new Array(6).fill(0));
        }
        return grid;
    }

    const board = createBoard();

    function randomBlock() {
        const blocks = "RYGBPS";
        return blocks[Math.floor(Math.random() * 6)];
    }

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
});