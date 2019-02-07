document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.scale(10, 10);

    // change Array; currently effecting all arrays
    const createBoard = () => {
        const grid = [];
        for (let height = 0; height < 12; height++) {
            grid.push(new Array(6).fill(0));
        }
        return grid;
    };

    const board = createBoard();

    let createStartingBoard = (board) => {
        for (let row = 11; row > 6; row--) {
            for (let col = 0; col < 6; col++) {
                board[row][col] = "G";
            }
        }
        return board;
    };

    const startingBoard = createStartingBoard(board);

    //

});