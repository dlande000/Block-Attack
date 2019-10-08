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

export function clearSolutions(grid) {
    // Clear any solutions on grid after swap, fall, or new row, return new grid.
    let _grid = grid;

    // an array of arrays of y,x coordinates. 
    let toClear = []; 

    _grid.forEach((row, y) => {
        row.forEach((block, x) => {
            // Check if block has color value, and that the new row isn't checked for solutions.  
            if (block.value && y < 12) {
                let checkingValue = block.value;
                // check horizontal
                checkHorizontal(_grid, block, y, x);
                // check vertical
                checkVertical(_grid, block, y, x);
            }
        });
    });

    return _grid;
}

const checkHorizontal = (_grid, block, y, x) => {
    let toClear = [];
    if (x < 4 && isMatching([block.value, _grid[y][x + 1].value, _grid[y][x + 2].value])) {
        toClear.concat([[y, x], [y, x + 1], [y, x + 2]]);
        if (x < 3 && isMatching([block.value, _grid[y][x + 3].value])) {
            toClear.concat([[y, x + 3]]);
            if (x < 2 && isMatching([block.value, _grid[y][x + 4].value])) {
                toClear.concat([y, x + 4]);
            }
        }
    }
};

const checkVertical = (_grid, block, y, x) => {
    toClear = [];
    if (y < 10 && toClear.length === 0 && isMatching([block.value, _grid[y + 1][x].value, _grid[y + 2][x].value])) {
        toClear.concat([[y, x], [y + 1, x], [y + 2, x]]);
        if (y < 9 && isMatching([block.value, _grid[y + 3][x].value])) {
            toClear.concat([y + 3, x]);
            if (y < 8 && isMatching([block.value, _grid[y + 4][x].value])) {
                toClear.concat([y + 4, x]);
            }
        }
    }
};

const isMatching = blocks => {
    // Return true if blocks match.
    for (let i = 0; i < blocks.length - 1; i++) {
        if (!blocks[i] || !blocks[i + 1] || blocks[i] !== blocks[i + 1]) {
            return false;
        }
    }
    return true;
};

// export function clearSolutions(grid) {
    // Clear any solutions on grid after swap, fall, or new row, return new grid.
    // let _grid = grid;
    // for (let y = 0; y < 12; y++) {
    //     for (let x = 0; x < 6; x++) {
    //         if (_grid[y][x].value && _grid[y + 1][x].value) {
    //             let col = checkStartingPointHorizontal(y, x)[1];
    //             let row = checkStartingPointVertical(y, col)[0];
    //             let pivot = _grid[row][col].value;
    //             let oneBelow;
    //             let twoBelow;
    //             let threeBelow;
    //             let fourBelow;
    //             let oneRight;
    //             let twoRight;
    //             let threeRight;
    //             let fourRight;
    //                 if (row < 8) {
    //                     oneBelow = _grid[row + 1][col].value;
    //                     twoBelow = _grid[row + 2][col].value;
    //                     threeBelow = _grid[row + 3][col].value;
    //                     fourBelow = _grid[row + 4][col].value;
    //                     if (pivot === oneBelow && pivot === twoBelow && pivot === threeBelow && pivot === fourBelow) {
    //                         checkAndDeleteNexusClusters([row + 2, col], 1);
    //                         for (let i = 0; i < 5; i++) {
    //                             _grid[row + i][col] = instance;
    //                         } cursor.score += 700;
    //                         audio.playSoundEffect();
    //                     }
    //                 }
    //                 if (row < 9) {
    //                     oneBelow = _grid[row + 1][col].value;
    //                     twoBelow = _grid[row + 2][col].value;
    //                     threeBelow = _grid[row + 3][col].value;
    //                     if (pivot === oneBelow && pivot === twoBelow && pivot === threeBelow) {
    //                         checkAndDeleteNexusClusters([row + 1, col], 2);
    //                         for (let i = 0; i < 4; i++) {
    //                             _grid[row + i][col] = instance;
    //                         } cursor.score += 300;
    //                         audio.playSoundEffect();
    //                     }
    //                 }
    //                 if (row < 10) {
    //                     oneBelow = _grid[row + 1][col].value;
    //                     twoBelow = _grid[row + 2][col].value;
                        
    //                     if (pivot === oneBelow && pivot === twoBelow) {
                            
    //                         checkAndDeleteNexusClusters([row, col], 3);
    //                         for (let i = 0; i < 3; i++) {
    //                             _grid[row + i][col] = instance;
                                
    //                         } cursor.score += 100;
    //                         audio.playSoundEffect();
    //                     }
    //                 }
    //                 if (col < 2) {
    //                     oneRight = _grid[row][col + 1].value;
    //                     twoRight = _grid[row][col + 2].value;
    //                     threeRight = _grid[row][col + 3].value;
    //                     fourRight = _grid[row][col + 4].value;
    //                     if (pivot === oneRight && pivot === twoRight && pivot === threeRight && pivot === fourRight && _grid[row + 1][col + 1].value && _grid[row + 1][col + 2].value && _grid[row + 1][col + 3].value && _grid[row + 1][col + 4].value) {
    //                         for (let i = 0; i < 5; i++) {
    //                             _grid[row][col + i] = instance;
    //                         } cursor.score += 700;
    //                         audio.playSoundEffect();
    //                     }} if (col < 3) {
    //                     oneRight = _grid[row][col + 1].value;
    //                     twoRight = _grid[row][col + 2].value;
    //                     threeRight = _grid[row][col + 3].value;
    //                     if (pivot === oneRight && pivot === twoRight && pivot === threeRight && _grid[row + 1][col + 1].value && _grid[row + 1][col + 2].value && _grid[row + 1][col + 3].value) {
    //                         for (let i = 0; i < 4; i++) {
    //                             _grid[row][col + i] = instance;
    //                         } cursor.score += 300;
    //                         audio.playSoundEffect();
    //                     }
    //                     } if (col < 4) {
    //                     oneRight = _grid[row][col + 1].value;
    //                     twoRight = _grid[row][col + 2].value;
    //                     if (pivot === oneRight && pivot === twoRight && _grid[row + 1][col + 1].value && _grid[row + 1][col + 2].value) {
    //                         checkAndDeleteNexusClustersLeftAndDown([row, col + 2]);
    //                         for (let i = 0; i < 3; i++) {
    //                             _grid[row][col + i] = instance;
    //                         } cursor.score += 100;
    //                         audio.playSoundEffect();
    //                     }
    //                 }
    //             }
    //     }
    // }
//     return _grid;
// }


// FIX THIS

// function checkAndDeleteNexusClustersLeftAndDown(position) {
//     let y = position[0];
//     let x = position[1];
//     if (y < 10 && grid[y][x].value === grid[y + 1][x].value && grid[y + 2][x].value) {
//         board[y + 1][x] = instance;
//         board[y + 2][x] = instance;
//         cursor.score += 200;
//     }
// }

// function checkAndDeleteNexusClusters(position, increment) {
//     let oneLeft;
//     let twoLeft;
//     let oneRight;
//     let twoRight;
//     for (let i = 0; i < increment; i++) {
//         let y = position[0] + i;
//         let x = position[1];
//         let pivot = board[y][x].value;
//         if (x >= 2) {
//             oneLeft = board[y][x - 1].value;
//             twoLeft = board[y][x - 2].value;
//             if (x <= 3) {
//                 oneRight = board[y][x + 1].value;
//                 twoRight = board[y][x + 2].value;
//                 if (pivot === oneLeft && pivot === twoLeft && pivot === oneRight && pivot === twoRight) {
//                     board[y][x - 1] = instance;
//                     board[y][x - 2] = instance;
//                     board[y][x + 1] = instance;
//                     board[y][x + 2] = instance;
//                     cursor.score += 700;
//                 }
//             } if (x <= 4) {
//                 oneRight = board[y][x + 1].value;
//                 if (pivot === oneLeft && pivot === twoLeft && pivot === oneRight) {
//                     board[y][x - 1] = instance;
//                     board[y][x - 2] = instance;
//                     board[y][x + 1] = instance;
//                     cursor.score += 500;
//                 }
//             } if (pivot === oneLeft && pivot === twoLeft) {
//                 board[y][x - 1] = instance;
//                 board[y][x - 2] = instance;
//                 cursor.score += 200;
//             }
//         } if (x <= 3) {
//             oneRight = board[y][x + 1].value;
//             twoRight = board[y][x + 2].value;
//             if (x >= 1) {
//                 oneLeft = board[y][x - 1].value;
//                 if (pivot === oneRight && pivot === twoRight && pivot === oneLeft) {
//                     board[y][x + 1] = instance;
//                     board[y][x + 1] = instance;
//                     board[y][x + 2] = instance;
//                     cursor.score += 500;
//                 }
//             } if (pivot === oneRight && pivot === twoRight) {
//                 board[y][x + 1] = instance;
//                 board[y][x + 2] = instance;
//                 cursor.score += 200;
//             }
//         } if (x >= 1 && x <= 4 && increment === 3) {
//             oneRight = board[y][x + 1].value;
//             oneLeft = board[y][x - 1].value;
//             if (pivot === oneRight && pivot === oneLeft) {
//                 board[y][x + 1] = instance;
//                 board[y][x - 1] = instance;
//                 cursor.score += 200;
//             }
//         }
//     }
// }


// function checkStartingPointHorizontal(row, col) {
//     if (board[row][col].value === board[row][col - 1].value && board[row - 1][col].value !== board[row][col].value) {
//         let col2 = col - 1;
//         return checkStartingPointHorizontal(row, col2);
//     } else {
//         return [row, col];
//     }
// }

// function checkStartingPointVertical(row, col) {
//     if ((board[row][col].value === board[row - 1][col].value && board[row][col].value === board[row + 1][col].value) || (board[row][col].value === board[row - 1][col].value && board[row][col].value === board[row - 2][col].value))  {
//         let row2 = row - 1;
//         return checkStartingPointVertical(row2, col);
//     } else {
//         return [row, col];
//     }
// }