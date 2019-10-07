export function clearSolutionsBeforeStart(grid) {
    // Remove any randomly-generated solutions from the board before game start.
    let _grid = grid;
    let checking = true;
    while (checking) {
        checking = false;
        _grid.forEach((row, y) => {
            row.forEach((block, x) => {
                if (block.value) {
                    if ((x < 4 && block.value === _grid[y][x + 1].value && block.value === _grid[y][x + 2].value) || 
                        (y < 10 && block.value === _grid[y + 1][x].value && block.value === _grid[y + 2][x].value)) {
                        _grid[y][x] = new Block();
                        checking = true;
                    }
                }
            });
        });
    }
    return _grid;
}

export function clearSolutionsFromNewRow(row) {
    // Remove any randomly-generated solutions from a new row before adding to grid.
    let _row = row;
    let checking = true;
    while (checking) {
        checking = false;
        for (let i = 0; i < 6; i++) {
            if ((i < 4 && _row[i].value === _row[i + 1].value && _row[i].value === _row[i + 2].value) || 
                (_row[i].value === _row[12][i].value)) {
                checking = true;
                _row[i] = new Block();
            } 
        }
    }
    return _row;
}