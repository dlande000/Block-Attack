import Block from './block';
import instance from './singleton';

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

export function clearSolutions(grid, cursor, soundEffect, sfPlaying) {
    // Check for any solutions after a swap, a fall, or a clear.
    let _grid = grid;
    _grid.forEach((row, y) => {
        row.forEach((block, x) => {
            // Check if block has color value, if block is floating, and that the new row isn't checked for solutions.  
            if (y < 12 && block.value && _grid[y + 1][x].value) {
                let checkingValue = block.value;

                // Block Attack! has 22 unique solutions. 
                // When checking the grid for solutions, 
                // we iterate from top (y = 0) to bottom (y = 11)
                // and left (x = 0) to right (x = 5). 
                // The first blocks of a solution will always be
                // the top-most and left-most. 
                // The below algorithm first checks for 
                // solutions vertically, then horizontally. 

                if (y < 10 && checkingValue === _grid[y + 1][x].value && checkingValue === _grid[y + 2][x].value) {
                    clearVerticalSolutions(checkingValue, y, x, _grid, cursor, soundEffect, sfPlaying);
                } else if (x < 4 && checkingValue === _grid[y][x + 1].value && checkingValue === _grid[y][x + 2].value) {
                    clearHorizontalSolutions(checkingValue, y, x, _grid, cursor, soundEffect, sfPlaying);
                }  
            }
        });
    });

    return _grid;
}

const clearVerticalSolutions = (checkingValue, y, x, _grid, cursor, soundEffect, sfPlaying) => {
    // Solution 1: 3 matching vertical. 
    // [x]
    // [x]
    // [x]

    for (let i = 0; i <= 2; i++) {
        _grid[y + i][x] = instance;   
    }
    cursor.score += 300;

    if (y < 9 && checkingValue === _grid[y + 3][x].value) {
        clearVerticalSolutionsFourDown(checkingValue, y, x, _grid, cursor, soundEffect, sfPlaying);
    } else if (x < 4 && checkingValue === _grid[y][x + 1].value && checkingValue === _grid[y][x + 2].value) {
        // Solution 2: 5 matching blocks.  
        // [x][x][x]
        // [x]
        // [x]

        _grid[y][x + 1] = instance;
        _grid[y][x + 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else if (x < 4 && checkingValue === _grid[y + 2][x + 1].value && checkingValue === _grid[y + 2][x + 2].value) {
        // Solution 3: 5 matching blocks. 
        // [x]
        // [x]
        // [x][x][x]

        _grid[y + 2][x + 1] = instance;
        _grid[y + 2][x + 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else if (x > 1 && checkingValue === _grid[y + 2][x - 1].value && checkingValue === _grid[y + 2][x - 2].value) {
        // Solution 4: 5 matching blocks. 
        //       [x]
        //       [x]
        // [x][x][x]

        _grid[y + 2][x - 1] = instance;
        _grid[y + 2][x - 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else if (x < 4 && checkingValue === _grid[y + 1][x + 1].value && checkingValue === _grid[y + 1][x + 2].value) {
        // Solution 5: 5 matching blocks. 
        // [x]
        // [x][x][x]
        // [x]

        _grid[y + 1][x + 1] = instance;
        _grid[y + 1][x + 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else if (x > 1 && checkingValue === _grid[y + 1][x - 1].value && checkingValue === _grid[y + 1][x - 2].value) {
        // Solution 6: 5 matching blocks. 
        //       [x]
        // [x][x][x]
        //       [x]

        _grid[y + 1][x - 1] = instance;
        _grid[y + 1][x - 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else {
        // return for solution 1. 
        if (sfPlaying) soundEffect.playSoundEffect();
        return _grid;
    }
};

const clearVerticalSolutionsFourDown = (checkingValue, y, x, _grid, cursor, soundEffect, sfPlaying) => {
    // Solution 7: 4 matching vertical. 
    // [x]
    // [x]
    // [x]
    // [x]

    _grid[y + 3][x] = instance;
    cursor.score += 100;
    
    if (y < 8 && checkingValue === _grid[y + 4][x].value) {
        clearVerticalSolutionsFiveDown(checkingValue, y, x, _grid, cursor, soundEffect, sfPlaying);
    } else if (x < 4 && checkingValue === _grid[y + 1][x + 1].value && checkingValue === _grid[y + 1][x + 2].value) {
        // Solution 8: 6 matching blocks. 
        // [x]
        // [x][x][x]
        // [x]
        // [x]

        _grid[y + 1][x + 1] = instance;
        _grid[y + 1][x + 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else if (x < 4 && checkingValue === _grid[y + 2][x + 1].value && checkingValue === _grid[y + 2][x + 2].value) {
        // Solution 9: 6 matching blocks. 
        // [x]
        // [x]
        // [x][x][x]
        // [x]

        _grid[y + 2][x + 1] = instance;
        _grid[y + 2][x + 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else if (x > 1 && checkingValue === _grid[y + 1][x - 1].value && checkingValue === _grid[y + 1][x - 2].value) {
        // Solution 10: 6 matching blocks. 
        //       [x]
        // [x][x][x]
        //       [x]
        //       [x]

        _grid[y + 1][x - 1] = instance;
        _grid[y + 1][x - 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else if (x > 1 && checkingValue === _grid[y + 2][x - 1].value && checkingValue === _grid[y + 2][x - 2].value) {
        // Solution 11: 6 matching blocks.
        //       [x]
        //       [x]
        // [x][x][x]
        //       [x]

        _grid[y + 2][x - 1] = instance;
        _grid[y + 2][x - 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else {
        // return for solution 7. 
        if (sfPlaying) soundEffect.playSoundEffect();
        return _grid;
    }
};

const clearVerticalSolutionsFiveDown = (checkingValue, y, x, _grid, cursor, soundEffect, sfPlaying) => {
    // Solution 12: 5 matching vertical.
    // [x]
    // [x]
    // [x]
    // [x]
    // [x]

    _grid[y + 4][x] = instance;
    cursor.score += 100;

    if (x > 1 && checkingValue === _grid[y + 2][x - 1].value && checkingValue === _grid[y + 2][x - 2].value) {
        // Solution 13: 7 matching blocks. 
        //       [x]
        //       [x]
        // [x][x][x]
        //       [x]
        //       [x]

        _grid[y + 2][x - 1] = instance;
        _grid[y + 2][x - 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();

        return _grid;
    } else if (x < 4 && checkingValue === _grid[y + 2][x + 1].value && checkingValue === _grid[y + 2][x + 2].value) {
        // Solution 14: 7 matching blocks. 
        // [x]
        // [x]
        // [x][x][x]
        // [x]
        // [x]

        _grid[y + 2][x + 1] = instance;
        _grid[y + 2][x + 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else {
        //return for solution 12. 
        if (sfPlaying) soundEffect.playSoundEffect();
        return _grid;
    }
};

const clearHorizontalSolutions = (checkingValue, y, x, _grid, cursor, soundEffect, sfPlaying) => {
    // Solution 15: 3 matching horizontal. 
    // [x][x][x]

    for (let i = 0; i <= 2; i++) {
        _grid[y][x + i] = instance;   
    }
    cursor.score += 300;

    if (x < 3 && checkingValue === _grid[y][x + 3].value) {
        clearHorizontalSolutionsFourAcross(checkingValue, y, x, _grid, cursor, soundEffect, sfPlaying);
    } else if (y < 10 && checkingValue === _grid[y + 1][x + 1].value && checkingValue === _grid[y + 2][x + 1].value) {
        // Solution 16: 5 matching blocks. 
        // [x][x][x]
        //    [x]
        //    [x]

        _grid[y + 1][x + 1] = instance;
        _grid[y + 2][x + 1] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else if (y < 10 && checkingValue === _grid[y + 1][x + 2].value && checkingValue === _grid[y + 2][x + 2].value) {
        // Solution 17: 5 matching blocks. 
        // [x][x][x]
        //       [x]
        //       [x]

        _grid[y + 1][x + 2] = instance;
        _grid[y + 2][x + 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else {
        // return for solution 15. 
        if (sfPlaying) soundEffect.playSoundEffect();
        return _grid;
    }
};

const clearHorizontalSolutionsFourAcross = (checkingValue, y, x, _grid, cursor, soundEffect, sfPlaying) => {
    // Solution 18: 4 matching horizontal. 
    // [x][x][x][x]

    _grid[y][x + 3] = instance;
    cursor.score += 100;

    if (x < 2 && checkingValue === _grid[y][x + 4].value) {
        clearHorizontalSolutionsFiveAcross(checkingValue, y, x, _grid, cursor, soundEffect, sfPlaying);
    } else if (y < 10 && checkingValue === _grid[y + 1][x + 1].value && checkingValue === _grid[y + 2][x + 1].value) {
        // Solution 19: 6 matching. 
        // [x][x][x][x]
        //    [x]
        //    [x]

        _grid[y + 1][x + 1] = instance;
        _grid[y + 2][x + 1] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else if (y < 10 && checkingValue === _grid[y + 1][x + 2].value && checkingValue === _grid[y + 2][x + 2].value) {
        // Solution 20: 6 matching. 
        // [x][x][x][x]
        //       [x]
        //       [x]

        _grid[y + 1][x + 2] = instance;
        _grid[y + 2][x + 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else {
        // return for solution 18. 
        if (sfPlaying) soundEffect.playSoundEffect();
        return _grid;
    }
};

const clearHorizontalSolutionsFiveAcross = (checkingValue, y, x, _grid, cursor, soundEffect, sfPlaying) => {
    // Solution 21: 5 matching horizontal. 
    // [x][x][x][x][x]

    _grid[y][x + 4] = instance;
    cursor.score += 100;
    if (y < 10 && checkingValue === _grid[y + 1][x + 2].value && checkingValue === _grid[y + 2][x + 2].value) {
        // Solution 22: 7 matching. 
        // [x][x][x][x][x]
        //       [x]
        //       [x]

        _grid[y + 1][x + 2] = instance;
        _grid[y + 2][x + 2] = instance;
        cursor.score += 300;
        if (sfPlaying) soundEffect.playSoundEffect();
        
        return _grid;
    } else {
        // return value for solution 21. 
        if (sfPlaying) soundEffect.playSoundEffect();
        return _grid;
    }
};