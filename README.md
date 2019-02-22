# Block Attack!

### Background

[Block Attack! Live](http://www.davidanderson.nyc/Block-Attack)

![screenshot](./assets/images/screenshot.png)

Block Attack! is a JavaScript puzzle game inspired by [Tetris Attack](https://www.youtube.com/watch?v=c8FtDgDPTbY&t=136s). Using a cursor, a player navigates a grid and flips the horizontal position of two blocks. If three or more blocks of the same color form a horizontal or verticle line, the blocks disappear, and the player is awarded points. Once the player's blocks hit the top of the grid, the game is over. 

### Technologies and Architecture

Block Attack! implements with the following technologies:

- `JavaScript`
- `HTML Canvas`

Block Attack! is built on a 6x13 grid; the bottom-most row rises from off-canvas until it is in the penultimate position. Before fully entering the visible grid, the bottom row is not available for player manipulation or puzzle solutions. 

The grid is populated with randomly generated blocks; once the grid is populated, a second function checks to remove any groupings of blocks that would provide immediate solutions upon game start. 

```javascript
function randomBlock() {
        const blocks = "RYGBDP";
        return blocks[Math.floor(Math.random() * 6)];
    }
```

```javascript
function createBoard() {
    const board = [];
    for (let height = 0; height < 13; height++) {
        board.push(new Array(6).fill(0));
    }
    for (let row = 12; row > 6; row--) {
        for (let col = 0; col < 6; col++) {
            if (col !== 3) {
                board[row][col] = randomBlock();
            }
        }
    }
    for (let x = 10; x < 13; x++) {
        board[x][3] = randomBlock();
    }
    checkStartingClusters(board);
    return board;
}
```

New rows are added to the grid every six seconds. Like the start board, rows are randomly generated and then checked for starting clusters. 

```javascript
function createNextRow() {
    let nextRow = [];
    for (let i = 0; i < 6; i++) {
        nextRow.push(randomBlock());
    }
    checkStartingClusters(nextRow);
    return nextRow;
}
```

Block Attack! is constantly combing through the grid to look for solutions that may have arisen from swapped, added, or falling blocks. Because of the number of solutions available, the main checking function, `checkAndDeleteClusters`, relies on many helper functions. First, the grid is provided a specific starting point via `checkStartingPointHorizontal` and `checkStartingPointVertical`; this is to ensure that a puzzle is always assessed by blocks below and to the right of a starting block, thus decreasing the complexity of checking for solutions. Then, while checking if a solution is found by testing the values of blocks below and to the right, the function `checkAndDeleteNexusClusters` looks for complex solutions—ones in which vertical solutions also provide horizontal solutions. Finally, the function `checkAndDeleteNexusClustersLeftAndDown` tests for one outlier solution. 

Players are awarded more points for more complex solutions (solutions that clear more blocks). The game is over once the top row of the grid has any non-zero values. 

### Future features

- Increase decrease the time between the addition of new rows to the grid. 
- Create difficulty settings that players can choose before starting a game. 
- Add falling blocks at incremented intervals and with random heights and widths that can be broken apart by solutions elsewhere on the grid. 
- Add a computer opponent or multiplayer option. 

### Artistic credits

Block Attack! was inspired by Tetris Attack (developed by Intelligent Systems and published by Nintendo in 1995). Game sprites were taken from [Tetris Attack JS](https://github.com/tzwaan/tetris-attack-js). "Blaze Stage" (background music) was taken from [Zophar's Music Domain](https://www.zophar.net/music/nintendo-snes-spc/tetris-attack). Sprites and music originally appeared in Tetris Attack. "Coin" sound effect was taken from [The Mushroom Kingdom](https://themushroomkingdom.net/media/smw/wav) and originally apeared in Super Mario World (developed and published in 1990 by Nintendo). Background image artist unknown. 