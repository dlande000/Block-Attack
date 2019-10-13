import Game from './game';
import Board from './board';

// webpack --watch --mode=development

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.scale(60, 60);
    let game = new Game(ctx);

    document.addEventListener('keydown', event => {
        if (event.keyCode === 37) {
            event.preventDefault();
            game.cursor.move(0, -1);
        } else if (event.keyCode === 38) {
            event.preventDefault();
            game.cursor.move(-1, 0);
        } else if (event.keyCode === 39) {
            event.preventDefault();
            game.cursor.move(0, 1);
        } else if (event.keyCode === 40) {
            event.preventDefault();
            game.cursor.move(1, 0);
        } else if (event.keyCode === 32) {
            if (!game.hasStarted) {
                game.hasStarted = true;
                game.musicPlaying = true;
                game.music.playMusic();
            } else if (game.hasStarted && game.gameOver) {
                game = new Game(ctx);
                game.hasStarted = true;
            } else {
                game.board.swap(game.cursor.y, game.cursor.x);
            }
        } else if (event.keyCode === 90) {
            game.board.createNextRow();
        } else if (event.keyCode === 83) {
            game.musicPlaying = !game.musicPlaying;
            if (game.musicPlaying) {
                game.music.playMusic();
            } else {
                game.music.stopMusic();
            }
        }
    });

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
            game.increaseY();
            game.updateScore();
            game.checkGameOver();
        } else if (game.hasStarted && game.gameOver) {
            // game.musicPlaying = false;
            // game.audio.stopMusic();
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

    update();
});