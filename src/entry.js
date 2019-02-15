document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.scale(60, 60);

    let gameOver = false;
    let startScreen = true;
    let isPlaying = false;

    const myAudio = document.getElementById("music");

    function playMusic() {
        if (!isPlaying) {
            myAudio.pause();
        } else {
            myAudio.play();
        }
    }

    function randomBlock() {
        const blocks = "RYGBDP";
        return blocks[Math.floor(Math.random() * 6)];
    }

    function createBoard() {
        const grid = [];
        for (let height = 0; height < 13; height++) {
            grid.push(new Array(6).fill(0));
        }
        for (let row = 12; row > 5; row--) {
            for (let col = 0; col < 6; col++) {
                if (col !== 3) {
                    grid[row][col] = randomBlock();
                }
            }
        }
        for (let x = 10; x < 13; x++) {
            grid[x][3] = randomBlock();
        }
        checkStartingClusters(grid);
        return grid;
    }

    let board = createBoard();

    let cursor = {
        pos: {x: 2, y: 7},
        score: 0
    };

    function checkStartingClusters(grid) {
        let checking = true;
        while (checking) {
            checking = false;
            if (grid.length !== 13) {
                grid.forEach((value, i) => {
                    if (i < 4 && value == grid[i + 1] && grid == board[i + 2]) {
                        checking = true;
                        grid[i] = randomBlock();
                        for (let i = 0; i < 6; i++) {
                            if (grid[i] === board[12][i]) {
                                grid[i] = randomBlock;
                            }
                        }
                    }
                });
            } else {
                grid.forEach((width, y) => {
                    width.forEach((value, x) => {
                        if (value !== 0) {
                            if ((x < 4 && value === grid[y][x + 1] && value === grid[y][x + 2]) || (y < 10 && value === grid[y + 1][x] && value === grid[y + 2][x])) {
                                grid[y][x] = randomBlock();
                                checking = true;
                        }
                    }
                });
            });
        }}
    }

    function createNextRow() {
        let nextRow = [];
        for (let i = 0; i < 6; i++) {
            nextRow.push(randomBlock());
        }
        checkStartingClusters(nextRow);
        return nextRow;
    }

    function swap(board, cursor) {
        let a = board[cursor.pos.y][cursor.pos.x];
        let b = board[cursor.pos.y][cursor.pos.x + 1];
        [a, b] = [b, a];
        board[cursor.pos.y][cursor.pos.x] = a;
        board[cursor.pos.y][cursor.pos.x + 1] = b;
        checkAndDeleteClusters(board);
    }

    function addRowToBoard(row, board) {
        board.shift();
        board.push(row);
    }

    function checkGameOver(row) {
        for (let i = 0; i < 6; i++) {
            if (row[i] !== 0) {
                gameOver = true;
            }
        }
    }

    function updateScore() {
        document.getElementById('score').innerText = cursor.score;
    }

    const BLOCKS = {
        "R": document.getElementById("red-block"),
        "Y": document.getElementById("yellow-block"),
        "G": document.getElementById("green-block"),
        "B": document.getElementById("blue-block"),
        "D": document.getElementById("dark-blue-block"),
        "P": document.getElementById("purple-block")
    };

    function drawBlock(block, y, x) {
        if (y !== 12) {
            ctx.drawImage(BLOCKS[block], 0.5, 0.5, 15, 15, x, y - yIncrease, 1, 1);
        } else {
            ctx.drawImage(BLOCKS[block], 15.5, 0.5, 15, 15, x, y - yIncrease, 1, 1);
        }
    }

    function drawCursor(x, y) {
        cursorImg = document.getElementById("cursor");
        let yIncreaseCursor = yIncrease;
        if (y === 0) {
            yIncreaseCursor = 0;
        }
        ctx.drawImage(cursorImg, 1, 1, 36, 20, x, y - yIncreaseCursor, 2, 1);
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

    function moveCursor(x, y) {
        let dy = cursor.pos.y + y;
        let dx = cursor.pos.x + x;
        if (dx <= 4 && dx >= 0) {
            cursor.pos.x = dx;
        }
        if (dy < 12 && dy >= 0) {
            cursor.pos.y = dy;
        }
    }

    function checkAndDeleteNexusClusters(position, increment) {
        let oneLeft;
        let twoLeft;
        let oneRight;
        let twoRight;

        for (let i = 0; i < increment; i++) {
            let y = position[0] + i;
            let x = position[1];
            let pivot = board[y][x];
            if (x >= 2) {
                oneLeft = board[y][x - 1];
                twoLeft = board[y][x - 2];
                if (x <= 3) {
                    oneRight = board[y][x + 1];
                    twoRight = board[y][x + 2];
                    if (pivot === oneLeft && pivot === twoLeft && pivot === oneRight && pivot === twoRight) {
                        board[y][x - 1] = 0;
                        board[y][x - 2] = 0;
                        board[y][x + 1] = 0;
                        board[y][x + 2] = 0;
                        cursor.score += 700;
                    }
                } if (x <= 4) {
                    oneRight = board[y][x + 1];
                    if (pivot === oneLeft && pivot === twoLeft && pivot === oneRight) {
                        board[y][x - 1] = 0;
                        board[y][x - 2] = 0;
                        board[y][x + 1] = 0;
                        cursor.score += 500;
                    }
                } if (pivot === oneLeft && pivot === twoLeft) {
                    board[y][x - 1] = 0;
                    board[y][x - 2] = 0;
                    cursor.score += 200;
                }
            } if (x <= 3) {
                oneRight = board[y][x + 1];
                twoRight = board[y][x + 2];
                if (x >= 1) {
                    oneLeft = board[y][x - 1];
                    if (pivot === oneRight && pivot === twoRight && pivot === oneLeft) {
                        board[y][x + 1] = 0;
                        board[y][x + 1] = 0;
                        board[y][x + 2] = 0;
                        cursor.score += 500;
                    }
                } if (pivot === oneRight && pivot === twoRight) {
                    board[y][x + 1] = 0;
                    board[y][x + 2] = 0;
                    cursor.score += 200;
                }
            }
        }
    }

    function checkAndDeleteClusters(board) {
        for (let row = 1; row < 12; row++) {
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
                if (pivot !== 0 && board[row + 1][col] !== 0) {
                    if (row <= 7) {
                        oneBelow = board[row + 1][col];
                        twoBelow = board[row + 2][col];
                        threeBelow = board[row + 3][col];
                        fourBelow = board[row + 4][col];
                        if (pivot === oneBelow && pivot === twoBelow && pivot === threeBelow && pivot === fourBelow) {
                            checkAndDeleteNexusClusters([row + 2, col], 1);
                            for (let i = 0; i < 5; i++) {
                                board[row + i][col] = 0;
                            } cursor.score += 700;
                        }
                    }
                    if (row <= 8) {
                        oneBelow = board[row + 1][col];
                        twoBelow = board[row + 2][col];
                        threeBelow = board[row + 3][col];
                        if (pivot === oneBelow && pivot === twoBelow && pivot === threeBelow) {
                            checkAndDeleteNexusClusters([row + 1, col], 2);
                            for (let i = 0; i < 4; i++) {
                                board[row + i][col] = 0;
                            } cursor.score += 300;
                        }
                    }
                    if (row <= 9) {
                        oneBelow = board[row + 1][col];
                        twoBelow = board[row + 2][col];
                        if (pivot === oneBelow && pivot === twoBelow) {
                            checkAndDeleteNexusClusters([row, col], 3);
                            for (let i = 0; i < 3; i++) {
                                board[row + i][col] = 0;
                            } cursor.score += 100;
                        }
                    }
                    if (col <= 1) {
                        oneRight = board[row][col + 1];
                        twoRight = board[row][col + 2];
                        threeRight = board[row][col + 3];
                        fourRight = board[row][col + 4];
                        if (pivot === oneRight && pivot === twoRight && pivot === threeRight && pivot === fourRight) {
                            for (let i = 0; i < 5; i++) {
                                board[row][col + i] = 0;
                            } cursor.score += 700;
                        }} if (col <= 2) {
                        oneRight = board[row][col + 1];
                        twoRight = board[row][col + 2];
                        threeRight = board[row][col + 3];
                        if (pivot === oneRight && pivot === twoRight && pivot === threeRight) {
                            for (let i = 0; i < 4; i++) {
                                board[row][col + i] = 0;
                            } cursor.score += 300;
                        }
                        } if (col <= 3) {
                        oneRight = board[row][col + 1];
                        twoRight = board[row][col + 2];
                        if (pivot === oneRight && pivot === twoRight) {
                            for (let i = 0; i < 3; i++) {
                                board[row][col + i] = 0;
                            } cursor.score += 100;
                        }
                    }
                }
            }
        }
    }

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
            event.preventDefault();
            moveCursor(0, -1);
        } else if (event.keyCode === 39) {
            moveCursor(1, 0);
        } else if (event.keyCode === 40) {
            event.preventDefault();
            moveCursor(0, 1);
        } else if (event.keyCode === 32) {
            if (startScreen || gameOver) {
                startScreen = false;
                gameOver = false;
                cursor.score = 0;
                board = createBoard();
                yIncrease = 0;
            } else {
                swap(board, cursor);
            }
        } else if (event.keyCode === 90) {
            addRowToBoard(createNextRow(), board);
        } else if (event.keyCode === 83) {
            isPlaying = !isPlaying;
            playMusic();
        }
    });

    let increaseInterval = 3500;
    let yIncrease = 0;

    function increaseY() {
        yIncrease += (1/50);
        if (yIncrease >= 1) {
            addRowToBoard(createNextRow(), board);
            if (cursor.pos.y !== 0) {
                cursor.pos.y--;
            }
            yIncrease = 0;
        }
    }

    setInterval(increaseY, (increaseInterval/50));

    function update() {
        if (startScreen) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#2c1960";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = ".5px 'Press Start 2P'";
            ctx.fillStyle = "white";
            ctx.fillText("Swap blocks", 0.3, 1);
            ctx.fillText("to clear", 0.3, 2);
            ctx.fillText("the board.", 0.3, 3);
            ctx.fillText("Don't let", 0.3, 5);
            ctx.fillText("the blocks", 0.3, 6);
            ctx.fillText("reach the", 0.3, 7);
            ctx.fillText("top.", 0.3, 8);
            ctx.fillText("Press space", 0.3, 10);
            ctx.fillText("to begin!", 0.3, 11);
        } else if (!gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            checkAndDeleteClusters(board);
            fall(board);
            drawBoard(board);
            updateScore();
            checkGameOver(board[0]);
        } else if (gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#2c1960";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = ".5px 'Press Start 2P'";
            ctx.fillStyle = "white";
            ctx.fillText("Great job!", 0.3, 3);
            ctx.fillText("Your score:", 0.3, 5);
            ctx.fillStyle = "gold";
            ctx.textAlign = "center";
            ctx.fillText(cursor.score, 3, 6);
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.fillText("Press space", 0.3, 8);
            ctx.fillText("to play", 0.3, 9);
            ctx.fillText("again!", 0.3, 10);
        }
        requestAnimationFrame(update);
    }

    playMusic();
    update();
});