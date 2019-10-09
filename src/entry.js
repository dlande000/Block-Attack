import Audio from './audio';
import Cursor from './cursor';
import Board from './board';
export let cursor = new Cursor();
export let audio = new Audio();

// webpack --watch --mode=development

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.scale(60, 60);

    let board = new Board();
    
    let gameOver = board.gameOver;
    let startScreen = true;

    const updateScore = () => document.getElementById('score').innerText = cursor.score;

    const BLOCKS = {
        "R": document.getElementById("red-block"),
        "Y": document.getElementById("yellow-block"),
        "G": document.getElementById("green-block"),
        "B": document.getElementById("blue-block"),
        "D": document.getElementById("dark-blue-block"),
        "P": document.getElementById("purple-block")
    };

    const drawBlock = (block, y, x) => {
        if (y === 12) {
            ctx.drawImage(BLOCKS[block], 15.5, 0.5, 15, 15, x, y - yIncrease, 1, 1);
        } else if (y === 1) {
            if (Math.round(Math.random() * 5) > 0) {
                ctx.drawImage(BLOCKS[block], 0.5, 0.5, 15, 15, x, y - yIncrease, 1, 1);
            } else {
                ctx.drawImage(BLOCKS[block], 45.5, 0.5, 15, 15, x, y - yIncrease, 1, 1);
            }
        } else if (y === 0) {
            if (Math.round(Math.random()) > 0) {
                ctx.drawImage(BLOCKS[block], 0.5, 0.5, 15, 15, x, y - yIncrease, 1, 1);
            } else {
                ctx.drawImage(BLOCKS[block], 45.5, 0.5, 15, 15, x, y - yIncrease, 1, 1);
            }
        } else {
            ctx.drawImage(BLOCKS[block], 0.5, 0.5, 15, 15, x, y - yIncrease, 1, 1);
        }
    };

    const drawCursor = (y, x) => {
        const cursorImg = document.getElementById("cursor");
        let yIncreaseCursor = yIncrease;
        if (y === 0) {
            yIncreaseCursor = 0;
        }
        ctx.drawImage(cursorImg, 1, 1, 36, 20, x, y - yIncreaseCursor, 2, 1);
    };

    const drawBoard = board => {
        board.forEach((row, y) => {
            row.forEach((block, x) => {
            if (block.value) {
                drawBlock(block.value, y, x);
            }});
        });
    };

    const draw = (board, cursor) => {
        drawBoard(board);
        drawCursor(cursor.y, cursor.x);
    };

    document.addEventListener('keydown', event => {
        if (event.keyCode === 37) {
            cursor.move(0, -1);
        } else if (event.keyCode === 38) {
            event.preventDefault();
            cursor.move(-1, 0);
        } else if (event.keyCode === 39) {
            cursor.move(0, 1);
        } else if (event.keyCode === 40) {
            event.preventDefault();
            cursor.move(1, 0);
        } else if (event.keyCode === 32) {
            if (startScreen || board.gameOver) {
                startScreen = false;
                board.gameOver = false;
                cursor.score = 0;
                board = new Board();
                yIncrease = 0;
                // audio.musicPlaying = true;
                // audio.playMusic();
            } else {
                board.swap(cursor.y, cursor.x);
            }
        } else if (event.keyCode === 90) {
            board.createNextRow();
        } else if (event.keyCode === 83) {
            // audio.musicPlaying = !audio.musicPlaying;
            // audio.playMusic();
        }
    });

    let increaseInterval = 5000;
    let yIncrease = 0;

    const increaseY = () => {
        yIncrease += (1/50);
        if (yIncrease >= 1) {
            board.createNextRow();
            if (cursor.y !== 0) {
                cursor.y--;
            }
            yIncrease = 0;
        }
    };

    setInterval(increaseY, (increaseInterval/50));

    const update = () => {
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
        } else if (!board.gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            board.fall();
            draw(board.grid, cursor);
            updateScore();
        } else if (board.gameOver) {
            // audio.musicPlaying = false;
            // audio.playMusic();
            // audio.music.currentTime = 0;
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
    };

    // window.board = board;

    // audio.playMusic();
    update();
});