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

export function checkSolutions(grid) {
    // Check for any solutions after a swap, a fall, or a clear. 
    let _grid = grid;

    // an array of arrays of y,x coordinates. 
    let toClear = []; 

    _grid.forEach((row, y) => {
        row.forEach((block, x) => {
            // Check if block has color value, and that the new row isn't checked for solutions.  
            if (block.value && y < 12) {
                // Block Attack! has 22 unique solutions; 
                // the below funtions check each possible solution
                // based first on the position of the checked block. 
                // Some solutions cannot be accessed in certain parts of the grid.
                if (y < 8 && 
                    x < 5 && 
                    isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value, _grid[y + 3][x].value, _grid[y + 4][x].value]) && 
                    isMatching([_grid[y][x + 1].value, _grid[y + 1][x + 1].value, _grid[y + 2][x + 1].value, _grid[y + 3][x + 1].value, _grid[y + 4][x + 1].value])) {
                        // Solution 1: 2 sets of 5 matching vertical blocks. 
                }
                if (y < 9 &&
                    x < 5 && 
                    isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value, _grid[y + 3][x].value]) && 
                    isMatching([_grid[y][x + 1].value, _grid[y + 1][x + 1].value, _grid[y + 2][x + 1].value, _grid[y + 3][x + 1].value])) {
                        // Solution 2: 2 sets of 4 matching vertical blocks. 
                }
                if (y < 8 && 
                    x > 1 &&
                    isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value, _grid[y + 3][x].value, _grid[y + 4][x].value, _grid[y + 2][x - 1].value, _grid[y + 2][x - 2].value])) {
                        // Solution 3: 7 matching blocks 1. 
                }
                if (y < 8 && 
                    x < 4 &&
                    isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value, _grid[y + 3][x].value, _grid[y + 4][x].value, _grid[y + 2][x + 1].value, _grid[y + 2][x + 2].value])) {
                        // Solution 4: 7 matching blocks 2. 
                }
                if (y < 10 &&
                    x < 5 &&
                    isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value]) && 
                    isMatching([_grid[y][x + 1].value, _grid[y + 1][x + 1].value, _grid[y + 2][x + 1].value])) {
                        // Solution 5: 2 sets of 3 matching blocks. 
                }
                if (y < 9 &&
                    x > 1 &&
                    isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value, _grid[y + 3][x], _grid[y + 1][x - 1].value, _grid[y + 1][x - 2].value])) {
                        // Solution 6: 6 matching blocks 1. 
                }
                if (y < 9 &&
                    x > 1 &&
                    isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value, _grid[y + 3][x], _grid[y + 2][x - 1].value, _grid[y + 2][x - 2].value])) {
                        // Solution 7: 6 matching blocks 2. 
                }
                if (y < 10 &&
                    x < 3 &&
                    isMatching([block.value, _grid[y][x + 1].value, _grid[y][x + 2].value, _grid[y][x + 3].value, _grid[y + 1][x + 1].value, _grid[y + 2][x + 1].value])) {
                        // Solution 8: 6 matching blocks 3. 
                }
                if (y < 10 &&
                    x < 3 &&
                    isMatching([block.value, _grid[y][x + 1].value, _grid[y][x + 2].value, _grid[y][x + 3].value, _grid[y + 1][x + 2].value, _grid[y + 2][x + 2].value])) {
                        // Solution 9: 6 matching blocks 4. 
                }
                if (y < 9 &&
                    x < 4 &&
                    isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value, _grid[y + 3][x].value, _grid[y + 1][x + 1].value, _grid[y + 1][x + 2].value])) {
                        // Solution 10: 6 matching blocks 5. 
                }
                if (y < 9 &&
                    x < 4 &&
                    isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value, _grid[y + 3][x].value, _grid[y + 2][x + 1].value, _grid[y + 2][x + 2].value])) {
                        // Solution 11: 6 matching blocks 6. 
                }
                if (y < 10 &&
                    x < 4 &&
                    isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value, _grid[y][x + 1].value, _grid[y][x + 2].value])) {
                        // Solution 12: 5 matching blocks 1. 
                }
                if (y < 10 &&
                    x < 4 &&
                    isMatching([block.value, _grid[y][x + 1].value, _grid[y][x + 2].value, _grid[y + 1][x + 1].value, _grid[y + 2][x + 1].value])) {
                        // Solution 13: 5 matching blocks 2. 
                }
                if (y < 10 &&
                    x < 4 &&
                    isMatching([block.value, _grid[y][x + 1].value, _grid[y][x + 2].value, _grid[y + 1][x + 2].value, _grid[y + 2][x + 2].value])) {
                        // Solution 14: 5 matching blocks 3. 
                }
                if (y < 10 &&
                    x > 1 &&
                    isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value, _grid[y + 2][x - 1].value, _grid[y + 2][x - 2].value])) {
                        // Solution 15: 5 matching blocks 4. 
                }
                if (y < 10 &&
                    x < 4 &&
                    isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value, _grid[y + 2][x + 1].value, _grid[y + 2][x + 2].value])) {
                        // Solution 16: 5 matching blocks 5. 
                }
                if (x < 4 && isMatching([block.value, _grid[y][x + 1].value, _grid[y][x + 2].value])) {
                    // Solution 17: 3 matching horizontal. 
                    if (x < 3 && isMatching([block.value, _grid[y][x + 3].value])) {
                        // Solution 18: 4 matching horizontal. 
                        if (x < 2 && isMatching([block.value, _grid[y][x + 4].value])) {
                            // Solution 19: 5 matching horizontal. 
                        }
                    }
                }
                if (y < 10 && isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value])) {
                    // Solution 20: 3 matching vertical. 
                    if (y < 9 && isMatching([block.value, _grid[y + 3][x].value])) {
                        // Solution 21: 4 matching vertical. 
                        if (y < 8 && isMatching([block.value, _grid[y + 4][x].value])) {
                            // Solution 22: 4 matching vertical. 
                        }
                    }
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