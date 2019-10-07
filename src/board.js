import Block from './block';
import instance from './singleton';
import { clearSolutionsBeforeStart, clearSolutionsFromNewRow } from './solutions';

class Board {
    constructor() {
        this.grid = this.createGrid();
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
        grid = clearSolutionsBeforeStart(grid);
        return grid;
    }

    createNextRow() {
        let nextRow = [];
        for (let i = 0; i < 6; i++) {
            nextRow.push(new Block());
        }
        nextRow = clearSolutionsFromNewRow(nextRow);
        this.grid.shift();
        this.grid.push(nextRow);
        // fix
        // checkGameOver()
        // checkanddeleteclusters
    }

    swap(y, x) {
        let a = this.grid[y][x];
        let b = this.grid[y][x + 1];
        [a, b] = [b, a];
        this.grid[y][x] = a;
        this.grid[y][x + 1] = b;
        // fix
        checkAndDeleteClusters(board);
    }
}

export default Board;