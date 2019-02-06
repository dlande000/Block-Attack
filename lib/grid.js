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
        
    }

    populateNextRow() {}
}