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


// FIX THIS

function checkAndDeleteNexusClustersLeftAndDown(position) {
    let y = position[0];
    let x = position[1];
    if (y < 10 && board[y][x].value === board[y + 1][x].value && board[y + 2][x].value) {
        board[y + 1][x] = instance;
        board[y + 2][x] = instance;
        cursor.score += 200;
    }
}

function checkAndDeleteNexusClusters(position, increment) {
    let oneLeft;
    let twoLeft;
    let oneRight;
    let twoRight;
    for (let i = 0; i < increment; i++) {
        let y = position[0] + i;
        let x = position[1];
        let pivot = board[y][x].value;
        if (x >= 2) {
            oneLeft = board[y][x - 1].value;
            twoLeft = board[y][x - 2].value;
            if (x <= 3) {
                oneRight = board[y][x + 1].value;
                twoRight = board[y][x + 2].value;
                if (pivot === oneLeft && pivot === twoLeft && pivot === oneRight && pivot === twoRight) {
                    board[y][x - 1] = instance;
                    board[y][x - 2] = instance;
                    board[y][x + 1] = instance;
                    board[y][x + 2] = instance;
                    cursor.score += 700;
                }
            } if (x <= 4) {
                oneRight = board[y][x + 1].value;
                if (pivot === oneLeft && pivot === twoLeft && pivot === oneRight) {
                    board[y][x - 1] = instance;
                    board[y][x - 2] = instance;
                    board[y][x + 1] = instance;
                    cursor.score += 500;
                }
            } if (pivot === oneLeft && pivot === twoLeft) {
                board[y][x - 1] = instance;
                board[y][x - 2] = instance;
                cursor.score += 200;
            }
        } if (x <= 3) {
            oneRight = board[y][x + 1].value;
            twoRight = board[y][x + 2].value;
            if (x >= 1) {
                oneLeft = board[y][x - 1].value;
                if (pivot === oneRight && pivot === twoRight && pivot === oneLeft) {
                    board[y][x + 1] = instance;
                    board[y][x + 1] = instance;
                    board[y][x + 2] = instance;
                    cursor.score += 500;
                }
            } if (pivot === oneRight && pivot === twoRight) {
                board[y][x + 1] = instance;
                board[y][x + 2] = instance;
                cursor.score += 200;
            }
        } if (x >= 1 && x <= 4 && increment === 3) {
            oneRight = board[y][x + 1].value;
            oneLeft = board[y][x - 1].value;
            if (pivot === oneRight && pivot === oneLeft) {
                board[y][x + 1] = instance;
                board[y][x - 1] = instance;
                cursor.score += 200;
            }
        }
    }
}


function checkStartingPointHorizontal(row, col) {
    console.log(row, col);
    console.log(board);
    console.log(board[row]);
    debugger
    if (board[row][col].value === board[row][col - 1].value && board[row - 1][col].value !== board[row][col].value) {
        let col2 = col - 1;
        return checkStartingPointHorizontal(row, col2);
    } else {
        return [row, col];
    }
}

function checkStartingPointVertical(row, col) {
    if ((board[row][col].value === board[row - 1][col].value && board[row][col].value === board[row + 1][col].value) || (board[row][col].value === board[row - 1][col].value && board[row][col].value === board[row - 2][col].value))  {
        let row2 = row - 1;
        return checkStartingPointVertical(row2, col);
    } else {
        return [row, col];
    }
}

function checkAndDeleteClusters(board) {
    for (let rowY = 0; rowY < 12; rowY++) {
        for (let colX = 0; colX < 6; colX++) {
            if (board[rowY][colX].value && board[rowY + 1][colX].value && !board.gameOver) {
                let col = checkStartingPointHorizontal(rowY, colX)[1];
                let row = checkStartingPointVertical(rowY, col)[0];
                let pivot = board[row][col].value;
                let oneBelow;
                let twoBelow;
                let threeBelow;
                let fourBelow;
                let oneRight;
                let twoRight;
                let threeRight;
                let fourRight;
                    if (row < 8) {
                        oneBelow = board[row + 1][col].value;
                        twoBelow = board[row + 2][col].value;
                        threeBelow = board[row + 3][col].value;
                        fourBelow = board[row + 4][col].value;
                        if (pivot === oneBelow && pivot === twoBelow && pivot === threeBelow && pivot === fourBelow) {
                            checkAndDeleteNexusClusters([row + 2, col], 1);
                            for (let i = 0; i < 5; i++) {
                                board[row + i][col] = instance;
                            } cursor.score += 700;
                            audio.playSoundEffect();
                        }
                    }
                    if (row < 9) {
                        oneBelow = board[row + 1][col].value;
                        twoBelow = board[row + 2][col].value;
                        threeBelow = board[row + 3][col].value;
                        if (pivot === oneBelow && pivot === twoBelow && pivot === threeBelow) {
                            checkAndDeleteNexusClusters([row + 1, col], 2);
                            for (let i = 0; i < 4; i++) {
                                board[row + i][col] = instance;
                            } cursor.score += 300;
                            audio.playSoundEffect();
                        }
                    }
                    if (row < 10) {
                        oneBelow = board[row + 1][col].value;
                        twoBelow = board[row + 2][col].value;
                        
                        if (pivot === oneBelow && pivot === twoBelow) {
                            
                            checkAndDeleteNexusClusters([row, col], 3);
                            for (let i = 0; i < 3; i++) {
                                board[row + i][col] = instance;
                                
                            } cursor.score += 100;
                            audio.playSoundEffect();
                        }
                    }
                    if (col < 2) {
                        oneRight = board[row][col + 1].value;
                        twoRight = board[row][col + 2].value;
                        threeRight = board[row][col + 3].value;
                        fourRight = board[row][col + 4].value;
                        if (pivot === oneRight && pivot === twoRight && pivot === threeRight && pivot === fourRight && board[row + 1][col + 1].value && board[row + 1][col + 2].value && board[row + 1][col + 3].value && board[row + 1][col + 4].value) {
                            for (let i = 0; i < 5; i++) {
                                board[row][col + i] = instance;
                            } cursor.score += 700;
                            audio.playSoundEffect();
                        }} if (col < 3) {
                        oneRight = board[row][col + 1].value;
                        twoRight = board[row][col + 2].value;
                        threeRight = board[row][col + 3].value;
                        if (pivot === oneRight && pivot === twoRight && pivot === threeRight && board[row + 1][col + 1].value && board[row + 1][col + 2].value && board[row + 1][col + 3].value) {
                            for (let i = 0; i < 4; i++) {
                                board[row][col + i] = instance;
                            } cursor.score += 300;
                            audio.playSoundEffect();
                        }
                        } if (col < 4) {
                        oneRight = board[row][col + 1].value;
                        twoRight = board[row][col + 2].value;
                        if (pivot === oneRight && pivot === twoRight && board[row + 1][col + 1].value && board[row + 1][col + 2].value) {
                            checkAndDeleteNexusClustersLeftAndDown([row, col + 2]);
                            for (let i = 0; i < 3; i++) {
                                board[row][col + i] = instance;
                            } cursor.score += 100;
                            audio.playSoundEffect();
                        }
                    }
                }
            }
    }
}