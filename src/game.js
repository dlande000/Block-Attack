import Board from './board';
import Audio from './audio';

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.board = new Board();
        this.cursor = this.board.cursor;
        this.music = new Audio(document.getElementById("music"));
        this.BLOCKS = {
            "R": document.getElementById("red-block"),
            "Y": document.getElementById("yellow-block"),
            "G": document.getElementById("green-block"),
            "B": document.getElementById("blue-block"),
            "D": document.getElementById("dark-blue-block"),
            "P": document.getElementById("purple-block")
        };
        this.yIncrease = 0;
        this.gamePace = 300;
        this.hasStarted = false;
        this.gameOver = false;
        this.musicPlaying = false;
    }

    updateScore() {
        document.getElementById('score').innerText = this.cursor.score;
    }

    drawBlock(block, y, x) {
        if (y === 12) {
            this.ctx.drawImage(this.BLOCKS[block], 15.5, 0.5, 15, 15, x, y - this.yIncrease, 1, 1);
        } else if (y === 1) {
            this.ctx.drawImage(this.BLOCKS[block], 65, 0.5, 15, 15, x, y - this.yIncrease, 1, 1);
        } else if (y === 0) {
            this.ctx.drawImage(this.BLOCKS[block], 80.5, 0.5, 15, 15, x, y - this.yIncrease, 1, 1);
        } else {
            this.ctx.drawImage(this.BLOCKS[block], 0.5, 0.5, 15, 15, x, y - this.yIncrease, 1, 1);
        }
    }

    drawCursor(y, x) {
        const cursorImg = document.getElementById("cursor");
        let yIncreaseCursor = this.yIncrease;
        if (y === 0) {
            yIncreaseCursor = 0;
        }
        this.ctx.drawImage(cursorImg, 1, 1, 36, 20, x, y - yIncreaseCursor, 2, 1);
    }

    drawBoard(board) {
        board.forEach((row, y) => {
            row.forEach((block, x) => {
            if (block.value) {
                this.drawBlock(block.value, y, x);
            }});
        });
    }

    draw(board, cursor) {
        this.drawBoard(board);
        this.drawCursor(cursor.y, cursor.x);
    }

    increaseY() {
        this.yIncrease += (1/this.gamePace);
        this.gamePace -= (1/50);
        if (this.yIncrease >= 1) {
            this.board.createNextRow();
            if (this.cursor.y !== 0) {
                this.cursor.y--;
            }
            this.yIncrease = 0;
        }
    }

    checkGameOver() {
        this.gameOver = this.board.gameOver;
    }
}

export default Game;