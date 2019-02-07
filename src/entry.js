document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.scale(60, 60);

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

    // create cursor
    let cursor = {
        pos: {x: 1, y: 1},
        score: 0
    };

    // checks a board for clusters of 3 colors
    function checkStartingClusters(board) {
        let checking = true;
        while (checking) {
            checking = false;
            board.forEach((width, y) => {
                width.forEach((value, x) => {
                    if (value !== 0) {
                        if ((x < 4 && value == board[y][x + 1] && value == board[y][x + 2]) || (y < 10 && value == board[y + 1][x] && value == board[y + 2][x])) {
                            board[y][x] = randomBlock();
                            checking = true;
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
    function swap(board, cursor) {
        let a = board[cursor.pos.y][cursor.pos.x];
        let b = board[cursor.pos.y][cursor.pos.x + 1];
        [a, b] = [b, a];
        board[cursor.pos.y][cursor.pos.x] = a;
        board[cursor.pos.y][cursor.pos.x + 1] = b;
    }

    // add next row to grid
    function addRowToBoard(row, board) {
        board.shift();
        board.push(row);
    }

    // checks game over when given the pushed row from the grid
    function checkGameOver(row) {
        for (let i = 0; i < 6; i++) {
            if (row[i] !== 0) {
                // GAME OVER
            }
        }
    }

    function updateScore() {
        document.getElementById('score').innerText = cursor.score;
    }

    // update at some point with better colors
    const COLORS = {
        "R": 'red',
        "Y": 'yellow',
        "G": 'green',
        "B": 'blue',
        "P": 'purple',
        "S": 'silver'
    };

    function drawBlock(block, y, x) {
        ctx.beginPath();
        ctx.lineWidth = ".04";
        ctx.strokeStyle = "black";
        ctx.rect(x, y, 1, 1);
        ctx.stroke();
        ctx.fillStyle = COLORS[block];
        ctx.fillRect(x, y, 1, 1);
    }

    // need to fix margin issues with cursor;
    function drawCursor(block, y, x) {
        if (block !== 0) {
            ctx.beginPath();
            ctx.lineWidth = "0.2";
            ctx.strokeStyle = "gold";
            ctx.rect(x, y, 2, 1);
            ctx.stroke();
            ctx.fillStyle = COLORS[block];
            ctx.fillRect(x, y, 1, 1);
        } else {
            ctx.beginPath();
            ctx.lineWidth = "0.2";
            ctx.strokeStyle = "gold";
            ctx.rect(x, y, 2, 1);
            ctx.stroke();
        }
    }

    function drawBoard(board) {
        board.forEach((row, y) => {
            row.forEach((block, x) => {
            if (x === cursor.pos.x && y === cursor.pos.y) {
                drawCursor(block, y, x);
            } else if (block !== 0) {
                drawBlock(block, y, x);
            }});
        });
    }

    // cursor.pos: {x: 2, y: 8}
    function moveCursor(x, y) {
        let dy = cursor.pos.y + y;
        let dx = cursor.pos.x + x;
        if (dx <= 5 && dx >= 0) {
            cursor.pos.x = dx;
        }
        
        if (dy <= 11 && dy >= 0) {
            cursor.pos.y = dy;
        }
    }

    // function checkAndDeleteClusters(board) {
    //     for (let row = 0; row < 12; row++) {
    //         for (let col = 0; col < 6; col++) {
    //             isFiveBelow();
    //             isFourBelow();
    //             isThreeBelow();
    //             isFiveAcross();
    //             isFourAcross();
    //             isThreeAcross();
    //             isNexus();
    //         }
    //     }
    // }

    document.addEventListener('keydown', event => {
        if (event.keyCode === 37) {
            moveCursor(-1, 0);
        } else if (event.keyCode === 38) {
            moveCursor(0, -1);
        } else if (event.keyCode === 39) {
            moveCursor(1, 0);
        } else if (event.keyCode === 40) {
            moveCursor(0, 1);
        } else if (event.keyCode === 32) {
            swap(board, cursor);
        } else if (event.keyCode === 90) {
            // push up new blocks;
        }
    });

    let increaseCounter = 0;
    let increaseInterval = 7000;
    let lastTime = 0;
    function update(time = 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = time - lastTime;
    
        increaseCounter += deltaTime;
        if (increaseCounter > increaseInterval) {
            addRowToBoard(createNextRow(), board);
            increaseCounter = 0;
        }

        lastTime = time;

        // checkAndDeleteClusters(board);
    
        drawBoard(board);
        requestAnimationFrame(update);
    }

    update();
});