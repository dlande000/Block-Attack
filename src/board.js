import Block from './block';
import instance from './singleton';
import { clearSolutionsBeforeStart,
    clearSolutionsFromNewRow,
    clearSolutions } from './solutions';

class Board {
    constructor() {
        this.grid = this.createGrid();
        this.gameOver = false;
    }

    createGrid() {
        let grid = [];
        for (let height = 0; height < 13; height++) {
            grid.push(new Array(6).fill(instance));
        }
        for (let row = 12; row > 6; row--) {
            for (let col = 0; col < 6; col++) {
                if (col !== 3) {
                    grid[row][col] = new Block();
                }
            }
        }
        for (let x = 10; x < 13; x++) {
            grid[x][3] = new Block();
        }
        return clearSolutionsBeforeStart(grid);
    }

    createNextRow() {
        let nextRow = [];
        for (let i = 0; i < 6; i++) {
            nextRow.push(new Block());
        }
        nextRow = clearSolutionsFromNewRow(nextRow, this.grid);
        this.checkGameOver(this.grid.shift());
        this.grid.push(nextRow);
        this.grid = clearSolutions(this.grid);
    }

    swap(y, x) {
        let a = this.grid[y][x];
        let b = this.grid[y][x + 1];
        [a, b] = [b, a];
        this.grid[y][x] = a;
        this.grid[y][x + 1] = b;
        this.fall();
    }

    fall() {
        this.grid.forEach((row, y) => {
            row.forEach((block, x) => {
                if (y < 11 && !this.grid[y + 1][x].value && block.value) {
                    this.grid[y + 1][x] = block;
                    this.grid[y][x] = instance;
                }
            });
        });
        let _grid = clearSolutions(this.grid);
        if (this.grid !== _grid) {
            this.grid = _grid;
            this.fall();
        }
    }

    checkGameOver(row) {
        for (let i = 0; i < 6; i++) {
            if (row[i].value) {
                this.gameOver = true;
            }
        }
    }
}

export default Board;