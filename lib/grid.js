import Block from './block';

export default class Grid {
    constructor() {
        this.grid = this.createGrid();
    }

    createGrid() {
        let grid = [];
        for (let row = 0; row < 12; row++) {
            let rows = [];
            for (let col = 0; col < 6; col++) {
                rows.push(0);
            }
            grid.push(rows);
        }
        this.populateGrid(grid);
    }

    populateGrid(grid) {
        for (let row = 11; row < 7; row--) {
           for (let col = 0; col < 12; col++) {
               grid[row][col] = new Block([row, col]);
           } 
        }
    }

    populateNextRow() {}
}