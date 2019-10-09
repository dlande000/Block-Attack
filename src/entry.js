import Game from './game';

// webpack --watch --mode=development

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.scale(60, 60);

    const game = new Game(ctx);

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
                music.musicPlaying = true;
                music.playMusic();
            } else {
                board.swap(cursor.y, cursor.x);
            }
        } else if (event.keyCode === 90) {
            board.createNextRow();
        } else if (event.keyCode === 83) {
            music.musicPlaying = !music.musicPlaying;
            if (music.musicPlaying) {
                music.playMusic();
            } else {
                music.stopMusic();
            }
        }
    });

    setInterval(game.increaseY, (game.increaseInterval/50));

    const update = () => {
        if (!game.hasStarted) {
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
        } else if (game.hasStarted && !game.gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.draw(game.board.grid, game.cursor);
            game.updateScore();
        } else if (game.hasStarted && game.gameOver) {
            game.music.stopMusic();
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
            ctx.fillText(game.cursor.score, 3, 6);
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.fillText("Press space", 0.3, 8);
            ctx.fillText("to play", 0.3, 9);
            ctx.fillText("again!", 0.3, 10);
        }
        requestAnimationFrame(update);
    };

    game.music.playMusic();
    update();
});