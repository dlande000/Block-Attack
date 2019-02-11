document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.scale(60, 60);

    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x+r, y);
        this.arcTo(x+w, y, x+w, y+h, r);
        this.arcTo(x+w, y+h, x, y+h, r);
        this.arcTo(x, y+h, x, y, r);
        this.arcTo(x, y, x+w, y, r);
        this.closePath();
        return this;
      };


        // ctx.beginPath();
        // ctx.lineWidth = ".15";
        // ctx.strokeStyle = "black";
        // ctx.rect(x, y, 1, 1);
        // ctx.stroke();

    CanvasRenderingContext2D.prototype.roundRectOutline = function (x, y, w, h, r, lw) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.lineWidth = lw;
        this.strokeStyle("black");
        this.moveTo(x+r, y);
        this.arcTo(x+w, y, x+w, y+h, r);
        this.arcTo(x+w, y+h, x, y+h, r);
        this.arcTo(x, y+h, x, y, r);
        this.arcTo(x, y, x+w, y, r);
        this.closePath();
        return this;
      };

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
        const blocks = "RYGBDP";
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
                        if ((x < 4 && value === board[y][x + 1] && value === board[y][x + 2]) || (y < 10 && value === board[y + 1][x] && value === board[y + 2][x])) {
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
        for (let row = 11; row > 5; row--) {
            for (let col = 0; col < 6; col++) {
                if (col !== 3) {board[row][col] = randomBlock();}
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
    const BLOCKS = {
        "R": document.getElementById("red-block"),
        "Y": document.getElementById("yellow-block"),
        "G": document.getElementById("green-block"),
        "B": document.getElementById("blue-block"),
        "D": document.getElementById("dark-blue-block"),
        "P": document.getElementById("purple-block")
    };

    function drawBlock(block, y, x) {
        ctx.drawImage(BLOCKS[block], 0.5, 0.5, 15, 15, x, y, 1, 1);
    }

    // need to fix margin issues with cursor;
    function drawCursor(x, y) {
        cursorImg = document.getElementById("cursor");
        ctx.drawImage(cursorImg, 1, 1, 36, 20, x, y, 2, 1);
    }

    function drawBoard(board) {
        board.forEach((row, y) => {
            row.forEach((block, x) => {
            if (block !== 0) {
                drawBlock(block, y, x);
            }});
        });
        drawCursor(cursor.pos.x, cursor.pos.y);
    }

    // cursor.pos: {x: 2, y: 8}
    function moveCursor(x, y) {
        let dy = cursor.pos.y + y;
        let dx = cursor.pos.x + x;
        if (dx <= 4 && dx >= 0) {
            cursor.pos.x = dx;
        }
        
        if (dy <= 11 && dy >= 0) {
            cursor.pos.y = dy;
        }
    }

    function checkAndDeleteClusters(board) {
        for (let row = 0; row < 12; row++) {
            for (let col = 0; col < 6; col++) {
                let pivot = board[row][col];
                let oneBelow;
                let twoBelow;
                let threeBelow;
                let fourBelow;
                let oneRight;
                let twoRight;
                let threeRight;
                let fourRight;
                if (pivot !== 0) {
                    if (col <= 1) {
                        oneRight = board[row][col + 1];
                        twoRight = board[row][col + 2];
                        threeRight = board[row][col + 3];
                        fourRight = board[row][col + 4];
                        if (pivot === oneRight && pivot === twoRight && pivot === threeRight && pivot === fourRight) {
                            for (let i = 0; i < 5; i++) {
                                board[row][col + i] = 0;
                                cursor.score += 700;
                            }
                        }} if (col <= 2) {
                        oneRight = board[row][col + 1];
                        twoRight = board[row][col + 2];
                        threeRight = board[row][col + 3];
                        if (pivot === oneRight && pivot === twoRight && pivot === threeRight) {
                            for (let i = 0; i < 4; i++) {
                                board[row][col + i] = 0;
                                cursor.score += 300;
                            }
                        }
                        } if (col <= 3) {
                        oneRight = board[row][col + 1];
                        twoRight = board[row][col + 2];
                        if (pivot === oneRight && pivot === twoRight) {
                            for (let i = 0; i < 3; i++) {
                                board[row][col + i] = 0;
                                cursor.score += 100;
                            }
                        }}

                        if (row <= 7 && col < 6) {
                            oneBelow = board[row + 1][col];
                            twoBelow = board[row + 2][col];
                            threeBelow = board[row + 3][col];
                            fourBelow = board[row + 4][col];
                            if (pivot === oneBelow && pivot === twoBelow && pivot === threeBelow && pivot === fourBelow) {
                                for (let i = 0; i < 5; i++) {
                                    board[row + i][col] = 0;
                                    cursor.score += 700;
                                }
                            }
                        }
                        if (row <= 8) {
                            oneBelow = board[row + 1][col];
                            twoBelow = board[row + 2][col];
                            threeBelow = board[row + 3][col];
                            if (pivot === oneBelow && pivot === twoBelow && pivot === threeBelow) {
                                for (let i = 0; i < 4; i++) {
                                    board[row + i][col] = 0;
                                    cursor.score += 300;
                                }
                            }
                        }
                            if (row <= 9) {
                            oneBelow = board[row + 1][col];
                            twoBelow = board[row + 2][col];
                            if (pivot === oneBelow && pivot === twoBelow) {
                                for (let i = 0; i < 3; i++) {
                                    board[row + i][col] = 0;
                                    cursor.score += 100;
                                }
                            }
                        }
                }
            }
        }}

    function fall(board) {
        board.forEach((row, y) => {
            row.forEach((val, x) => {
                if (y < 11 && board[y + 1][x] === 0 && val !== 0) {
                    board[y + 1][x] = val;
                    board[y][x] = 0;
                }
            });
        });
    }

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
            addRowToBoard(createNextRow(), board);
        }
    });

    let increaseCounter = 0;
    let increaseInterval = 6000;
    let lastTime = 0;
    function update(time = 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = time - lastTime;
    
        increaseCounter += deltaTime;
        if (increaseCounter > increaseInterval) {
            addRowToBoard(createNextRow(), board);
            if (cursor.pos.y !== 0) {
                cursor.pos.y--;
            }
            increaseCounter = 0;
        }

        lastTime = time;

        checkAndDeleteClusters(board);
        fall(board);

        increaseInterval -= 0.25;
    
        drawBoard(board);
        updateScore();
        requestAnimationFrame(update);
    }
    window.board = board;

    function game() {

    }

    update();
});