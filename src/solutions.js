import Block from './block';
import instance from './singleton';
import Audio from './audio';

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

export function clearSolutionsFromNewRow(row, grid) {
    // Remove any randomly-generated solutions from a new row before adding to grid.
    let _row = row;
    let checking = true;
    while (checking) {
        checking = false;
        for (let i = 0; i < 6; i++) {
            if ((i < 4 && _row[i].value === _row[i + 1].value && _row[i].value === _row[i + 2].value) || 
                (_row[i].value === grid[12][i].value)) {
                checking = true;
                _row[i] = new Block();
            } 
        }
    }
    return _row;
}

export function clearSolutions(grid) {
    // Check for any solutions after a swap, a fall, or a clear. 
    let _grid = grid;

    // add scores
    _grid.forEach((row, y) => {
        row.forEach((block, x) => {
            // Check if block has color value, and that the new row isn't checked for solutions.  
            if (block.value && y < 12) {
                let checkingValue = block.value;
                // Block Attack! has 20 unique solutions; 
                // the below funtions check each possible solution
                // based first on the position of the checked block. 
                // Some solutions cannot be accessed in certain parts of the grid.

                // Vertical based solutions. 
                if (y < 10 && isMatching([checkingValue, _grid[y + 1][x].value, _grid[y + 2][x].value])) {
                    // Solution 1: 3 matching vertical. 
                    for (let i = 0; i <= 2; i++) {
                        _grid[y + i][x] = instance;   
                    }
                    if (x < 4 && checkingValue === _grid[y][x + 1].value && checkingValue === _grid[y][x + 2].value) {
                        // Solution 2: 5 matching blocks 1. 
                        _grid[y][x + 1] = instance;
                        _grid[y][x + 2] = instance;
                    } else if (x > 1 && checkingValue === _grid[y + 2][x - 1].value && checkingValue === _grid[y + 2][x - 2].value) {
                        // Solution 3: 5 matching blocks 2. 
                        _grid[y + 2][x - 1] = instance;
                        _grid[y + 2][x - 2] = instance;
                    } else if (x < 4 &&  checkingValue === _grid[y + 2][x + 1].value && checkingValue === _grid[y + 2][x + 2].value) {
                        // Solution 4: 5 matching blocks 3. 
                        _grid[y + 2][x + 1].value = instance;
                        _grid[y + 2][x + 2].value = instance;
                    } else if (y < 9 && checkingValue === _grid[y + 3][x].value) {
                        // Solution 5: 4 matching vertical. 
                        _grid[y + 3][x] = instance;
                        if (x < 4 && checkingValue === _grid[y + 1][x + 1].value && checkingValue === _grid[y + 1][x + 2].value) {
                            // Solution 6: 6 matching blocks 1. 
                            _grid[y + 1][x + 1] = instance;
                            _grid[y + 1][x + 2] = instance;
                        } else if (x < 4 && checkingValue === _grid[y + 2][x + 1].value && checkingValue === _grid[y + 2][x + 2].value) {
                            // Solution 7: 6 matching blocks 2. 
                            _grid[y + 2][x + 1] = instance;
                            _grid[y + 2][x + 2] = instance;
                        } else if (x > 1 && checkingValue === _grid[y + 1][x + 1].value && checkingValue === _grid[y - 1][x - 2].value) {
                            // Solution 8: 6 matching blocks 3. 
                            _grid[y + 1][x - 1] = instance;
                            _grid[y + 1][x - 2] = instance;
                        } else if (x > 1 && checkingValue === _grid[y + 2][x - 1].value && checkingValue === _grid[y + 2][x - 2].value) {
                            // Solution 9: 6 matching blocks 4.
                            _grid[y + 2][x - 1] = instance;
                            _grid[y + 2][x - 2] = instance;
                        }
                        if (y < 8 && checkingValue === _grid[y + 4][x].value) {
                            // Solution 10: 5 matching vertical.
                            _grid[y + 4][x] = instance;
                            if (x > 1 && checkingValue === _grid[y + 2][x - 1].value && checkingValue === _grid[y + 2][x - 2].value) {
                                // Solution 11: 7 matching blocks 1. 
                                _grid[y + 2][x - 1] = instance;
                                _grid[y + 2][x - 2] = instance;
                            } else if (x < 4 && checkingValue === _grid[y + 2][x + 1].value && checkingValue === _grid[y + 2][x + 2].value) {
                                // Solution 11: 7 matching blocks 1. 
                                _grid[y + 2][x + 1] = instance;
                                _grid[y + 2][x + 2] = instance;
                            } 
                        }
                    }
                    // return _grid;
                }

                // Horizontal based solutions. 
                else if (x < 4 && isMatching([checkingValue, _grid[y][x + 1].value, _grid[y][x + 2].value])) {
                    // Solution 17: 3 matching horizontal. 
                    for (let i = 0; i <= 2; i++) {
                        _grid[y][x + i] = instance;   
                    }
                    if (x < 3 && checkingValue === _grid[y][x + 3].value) {
                        // Solution 18: 4 matching horizontal. 
                        _grid[y][x + 3] = instance;  
                        if (x < 2 && checkingValue === _grid[y][x + 4].value) {
                            // Solution 19: 5 matching horizontal. 
                            _grid[y][x + 4] = instance;
                        }
                    }
                    // return _grid;
                }



                
            }
        });
    });

    return _grid;
}

const isMatching = blocks => {
    // Return true if all blocks match.
    for (let i = 0; i < blocks.length - 1; i++) {
        if (blocks[i] !== blocks[i + 1]) {
            return false;
        }
    }
    return true;
};