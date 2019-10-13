/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/audio.js":
/*!**********************!*\
  !*** ./src/audio.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Audio {
    constructor(file) {
        this.source = file;
        this.musicPlaying = false;
    }

    playMusic() {
        this.musicPlaying = true;
        this.source.play();
    }

    stopMusic() {
        this.musicPlaying = false;
        this.source.pause();
        this.source.currentTime = 0;
    }

    playSoundEffect() {
        this.source.play();
                setTimeout(() => {
                    this.source.pause();
                    this.source.currentTime = 0;
                }, 450);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Audio);

/***/ }),

/***/ "./src/block.js":
/*!**********************!*\
  !*** ./src/block.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Block {
    constructor() {
        this.value = this.randomBlock();
    }

    randomBlock() {
        const blocks = "RYGBDP";
        return blocks[Math.floor(Math.random() * 6)];
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Block);

/***/ }),

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ "./src/block.js");
/* harmony import */ var _singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./singleton */ "./src/singleton.js");
/* harmony import */ var _solutions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solutions */ "./src/solutions.js");




class Board {
    constructor() {
        this.grid = this.createGrid();
        this.gameOver = false;
    }

    createGrid() {
        let grid = [];
        for (let height = 0; height < 13; height++) {
            grid.push(new Array(6).fill(_singleton__WEBPACK_IMPORTED_MODULE_1__["default"]));
        }
        for (let row = 12; row > 6; row--) {
            for (let col = 0; col < 6; col++) {
                if (col !== 3) {
                    grid[row][col] = new _block__WEBPACK_IMPORTED_MODULE_0__["default"]();
                }
            }
        }
        for (let x = 10; x < 13; x++) {
            grid[x][3] = new _block__WEBPACK_IMPORTED_MODULE_0__["default"]();
        }
        return Object(_solutions__WEBPACK_IMPORTED_MODULE_2__["clearSolutionsBeforeStart"])(grid);
    }

    createNextRow() {
        let nextRow = [];
        for (let i = 0; i < 6; i++) {
            nextRow.push(new _block__WEBPACK_IMPORTED_MODULE_0__["default"]());
        }
        nextRow = Object(_solutions__WEBPACK_IMPORTED_MODULE_2__["clearSolutionsFromNewRow"])(nextRow, this.grid);
        this.checkGameOver(this.grid.shift());
        this.grid.push(nextRow);
        this.grid = Object(_solutions__WEBPACK_IMPORTED_MODULE_2__["clearSolutions"])(this.grid);
    }

    swap(y, x) {
        let a = this.grid[y][x];
        let b = this.grid[y][x + 1];
        [a, b] = [b, a];
        this.grid[y][x] = a;
        this.grid[y][x + 1] = b;
        this.fall();
    }

    fall() {
        this.grid.forEach((row, y) => {
            row.forEach((block, x) => {
                for (let i = 0; y < 11 && this.grid[y + i][x].value && !this.grid[y + i + 1][x].value ; i++) {
                    this.grid[y + i + 1][x] = block;
                    this.grid[y + i][x] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                }
            });
        });
        let _grid = Object(_solutions__WEBPACK_IMPORTED_MODULE_2__["clearSolutions"])(this.grid);
        if (this.grid !== _grid) {
            this.grid = _grid;
        }
        this.fall();
    }

    checkGameOver(row) {
        for (let i = 0; i < 6; i++) {
            if (row[i].value) {
                this.gameOver = true;
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Board);

/***/ }),

/***/ "./src/cursor.js":
/*!***********************!*\
  !*** ./src/cursor.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Cursor {
    constructor() {
        this.y = 7;
        this.x = 2;
        this.score = 0;
    }

    move(y, x) {
        let dy = this.y + y;
        let dx = this.x + x;
        if (dx <= 4 && dx >= 0) {
            this.x = dx;
        }
        if (dy < 12 && dy >= 0) {
            this.y = dy;
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Cursor);

/***/ }),

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board */ "./src/board.js");



// webpack --watch --mode=development

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.scale(60, 60);
    let game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);

    document.addEventListener('keydown', event => {
        if (event.keyCode === 37) {
            event.preventDefault();
            game.cursor.move(0, -1);
        } else if (event.keyCode === 38) {
            event.preventDefault();
            game.cursor.move(-1, 0);
        } else if (event.keyCode === 39) {
            event.preventDefault();
            game.cursor.move(0, 1);
        } else if (event.keyCode === 40) {
            event.preventDefault();
            game.cursor.move(1, 0);
        } else if (event.keyCode === 32) {
            if (!game.hasStarted) {
                game.hasStarted = true;
                game.cursor.score = 0;
                game.yIncrease = 0;
                // game.music.musicPlaying = true;
                // game.music.playMusic();
            } else if (game.hasStarted && game.gameOver) {
                game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
                game.hasStarted = true;
            } else {
                game.board.swap(game.cursor.y, game.cursor.x);
            }
        } else if (event.keyCode === 90) {
            game.board.createNextRow();
        } else if (event.keyCode === 83) {
            // game.music.musicPlaying = !game.music.musicPlaying;
            // if (game.music.musicPlaying) {
            //     game.music.playMusic();
            // } else {
            //     game.music.stopMusic();
            // }
        }
    });

    const update = () => {
        if (!game.hasStarted) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#2c1960";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = ".5px 'Press Start 2P'";
            ctx.fillStyle = "white";
            ctx.fillText("Swap blocks", 0.3, 1);
            ctx.fillText("to clear", 0.3, 2);
            ctx.fillText("the board.", 0.3, 3);
            ctx.fillText("Don't let", 0.3, 5);
            ctx.fillText("the blocks", 0.3, 6);
            ctx.fillText("reach the", 0.3, 7);
            ctx.fillText("top.", 0.3, 8);
            ctx.fillText("Press space", 0.3, 10);
            ctx.fillText("to begin!", 0.3, 11);
        } else if (game.hasStarted && !game.gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.draw(game.board.grid, game.cursor);
            game.increaseY();
            game.updateScore();
            game.checkGameOver();
        } else if (game.hasStarted && game.gameOver) {
            // game.music.stopMusic();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#2c1960";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = ".5px 'Press Start 2P'";
            ctx.fillStyle = "white";
            ctx.fillText("Great job!", 0.3, 3);
            ctx.fillText("Your score:", 0.3, 5);
            ctx.fillStyle = "gold";
            ctx.textAlign = "center";
            ctx.fillText(game.cursor.score, 3, 6);
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.fillText("Press space", 0.3, 8);
            ctx.fillText("to play", 0.3, 9);
            ctx.fillText("again!", 0.3, 10);
        }
        requestAnimationFrame(update);
    };

    // game.music.playMusic();
    update();
});

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cursor */ "./src/cursor.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board */ "./src/board.js");
/* harmony import */ var _audio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./audio */ "./src/audio.js");




class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.board = new _board__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.cursor = new _cursor__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.music = new _audio__WEBPACK_IMPORTED_MODULE_2__["default"](document.getElementById("music"));
        this.soundEffect = new _audio__WEBPACK_IMPORTED_MODULE_2__["default"](document.getElementById("sound-effect"));
        this.BLOCKS = {
            "R": document.getElementById("red-block"),
            "Y": document.getElementById("yellow-block"),
            "G": document.getElementById("green-block"),
            "B": document.getElementById("blue-block"),
            "D": document.getElementById("dark-blue-block"),
            "P": document.getElementById("purple-block")
        };
        this.yIncrease = 0;
        this.gamePace = 300;
        this.hasStarted = false;
        this.gameOver = false;
    }

    updateScore() {
        document.getElementById('score').innerText = this.cursor.score;
    }

    drawBlock(block, y, x) {
        if (y === 12) {
            this.ctx.drawImage(this.BLOCKS[block], 15.5, 0.5, 15, 15, x, y - this.yIncrease, 1, 1);
        } else if (y === 1) {
            this.ctx.drawImage(this.BLOCKS[block], 65, 0.5, 15, 15, x, y - this.yIncrease, 1, 1);
        } else if (y === 0) {
            this.ctx.drawImage(this.BLOCKS[block], 80.5, 0.5, 15, 15, x, y - this.yIncrease, 1, 1);
        } else {
            this.ctx.drawImage(this.BLOCKS[block], 0.5, 0.5, 15, 15, x, y - this.yIncrease, 1, 1);
        }
    }

    drawCursor(y, x) {
        const cursorImg = document.getElementById("cursor");
        let yIncreaseCursor = this.yIncrease;
        if (y === 0) {
            yIncreaseCursor = 0;
        }
        this.ctx.drawImage(cursorImg, 1, 1, 36, 20, x, y - yIncreaseCursor, 2, 1);
    }

    drawBoard(board) {
        board.forEach((row, y) => {
            row.forEach((block, x) => {
            if (block.value) {
                this.drawBlock(block.value, y, x);
            }});
        });
    }

    draw(board, cursor) {
        this.drawBoard(board);
        this.drawCursor(cursor.y, cursor.x);
    }

    increaseY() {
        this.yIncrease += (1/this.gamePace);
        this.gamePace -= (1/50);
        if (this.yIncrease >= 1) {
            this.board.createNextRow();
            if (this.cursor.y !== 0) {
                this.cursor.y--;
            }
            this.yIncrease = 0;
        }
    }

    checkGameOver() {
        this.gameOver = this.board.gameOver;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./src/singleton.js":
/*!**************************!*\
  !*** ./src/singleton.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Singleton {
    constructor() {
        this.value = null;
        if (!Singleton.instance) {
            Singleton.instance = this;
        }
        return Singleton.instance;
    }
}

const instance = new Singleton();
Object.freeze(instance);
/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./src/solutions.js":
/*!**************************!*\
  !*** ./src/solutions.js ***!
  \**************************/
/*! exports provided: clearSolutionsBeforeStart, clearSolutionsFromNewRow, clearSolutions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearSolutionsBeforeStart", function() { return clearSolutionsBeforeStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearSolutionsFromNewRow", function() { return clearSolutionsFromNewRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearSolutions", function() { return clearSolutions; });
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ "./src/block.js");
/* harmony import */ var _singleton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./singleton */ "./src/singleton.js");



function clearSolutionsBeforeStart(grid) {
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
                        _grid[y][x] = new _block__WEBPACK_IMPORTED_MODULE_0__["default"]();
                        checking = true;
                    }
                }
            });
        });
    }
    return _grid;
}

function clearSolutionsFromNewRow(row, grid) {
    // Remove any randomly-generated solutions from a new row before adding to grid.
    let _row = row;
    let checking = true;
    while (checking) {
        checking = false;
        for (let i = 0; i < 6; i++) {
            if ((i < 4 && _row[i].value === _row[i + 1].value && _row[i].value === _row[i + 2].value) || 
                (_row[i].value === grid[12][i].value)) {
                checking = true;
                _row[i] = new _block__WEBPACK_IMPORTED_MODULE_0__["default"]();
            } 
        }
    }
    return _row;
}

function clearSolutions(grid, cursor) {
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

                // Vertical-starting solutions. 
                if (y < 10 && checkingValue === _grid[y + 1][x].value && checkingValue === _grid[y + 2][x].value) {
                    // Solution 1: 3 matching vertical. 
                    // [x]
                    // [x]
                    // [x]

                    for (let i = 0; i <= 2; i++) {
                        _grid[y + i][x] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];   
                    }
                    // cursor.score += 300;

                    if (y < 9 && checkingValue === _grid[y + 3][x].value) {
                        // Solution 2: 4 matching vertical. 
                        // [x]
                        // [x]
                        // [x]
                        // [x]

                        _grid[y + 3][x] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        // cursor.score += 100;
                        
                        if (y < 8 && checkingValue === _grid[y + 4][x].value) {
                            // Solution 3: 5 matching vertical.
                            // [x]
                            // [x]
                            // [x]
                            // [x]
                            // [x]

                            _grid[y + 4][x] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            // cursor.score += 100;

                            if (x > 1 && checkingValue === _grid[y + 2][x - 1].value && checkingValue === _grid[y + 2][x - 2].value) {
                                // Solution 4: 7 matching blocks. 
                                //       [x]
                                //       [x]
                                // [x][x][x]
                                //       [x]
                                //       [x]

                                _grid[y + 2][x - 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                                _grid[y + 2][x - 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                                // cursor.score += 200;
                        
                                return _grid;
                            } else if (x < 4 && checkingValue === _grid[y + 2][x + 1].value && checkingValue === _grid[y + 2][x + 2].value) {
                                // Solution 5: 7 matching blocks. 
                                // [x]
                                // [x]
                                // [x][x][x]
                                // [x]
                                // [x]

                                _grid[y + 2][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                                _grid[y + 2][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                                // cursor.score += 200;
                                
                                return _grid;
                            } else {
                                //return for solution 3. 
                                return _grid;
                            }
                        } else if (x < 4 && checkingValue === _grid[y + 1][x + 1].value && checkingValue === _grid[y + 1][x + 2].value) {
                            // Solution 6: 6 matching blocks. 
                            // [x]
                            // [x][x][x]
                            // [x]
                            // [x]

                            _grid[y + 1][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            _grid[y + 1][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            // cursor.score += 200;
                            
                            return _grid;
                        } else if (x < 4 && checkingValue === _grid[y + 2][x + 1].value && checkingValue === _grid[y + 2][x + 2].value) {
                            // Solution 7: 6 matching blocks. 
                            // [x]
                            // [x]
                            // [x][x][x]
                            // [x]

                            _grid[y + 2][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            _grid[y + 2][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            // cursor.score += 200;
                            
                            return _grid;
                        } else if (x > 1 && checkingValue === _grid[y + 1][x - 1].value && checkingValue === _grid[y + 1][x - 2].value) {
                            // Solution 8: 6 matching blocks. 
                            //       [x]
                            // [x][x][x]
                            //       [x]
                            //       [x]

                            _grid[y + 1][x - 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            _grid[y + 1][x - 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            // cursor.score += 200;
                            
                            return _grid;
                        } else if (x > 1 && checkingValue === _grid[y + 2][x - 1].value && checkingValue === _grid[y + 2][x - 2].value) {
                            // Solution 9: 6 matching blocks.
                            //       [x]
                            //       [x]
                            // [x][x][x]
                            //       [x]

                            _grid[y + 2][x - 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            _grid[y + 2][x - 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            // cursor.score += 200;
                            
                            return _grid;
                        } else {
                            // return for solution 2. 
                            return _grid;
                        }
                    } else if (x < 4 && checkingValue === _grid[y][x + 1].value && checkingValue === _grid[y][x + 2].value) {
                        // Solution 10: 5 matching blocks.  
                        // [x][x][x]
                        // [x]
                        // [x]

                        _grid[y][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        _grid[y][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        // cursor.score += 200;
                        
                        return _grid;
                    } else if (x < 4 && checkingValue === _grid[y + 2][x + 1].value && checkingValue === _grid[y + 2][x + 2].value) {
                        // Solution 11: 5 matching blocks. 
                        // [x]
                        // [x]
                        // [x][x][x]

                        _grid[y + 2][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        _grid[y + 2][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        // cursor.score += 200;
                        
                        return _grid;
                    } else if (x > 1 && checkingValue === _grid[y + 2][x - 1].value && checkingValue === _grid[y + 2][x - 2].value) {
                        // Solution 12: 5 matching blocks. 
                        //       [x]
                        //       [x]
                        // [x][x][x]

                        _grid[y + 2][x - 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        _grid[y + 2][x - 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        // cursor.score += 200;
                        
                        return _grid;
                    } else if (x < 4 && checkingValue === _grid[y + 1][x + 1].value && checkingValue === _grid[y + 1][x + 2].value) {
                        // Solution 13: 5 matching blocks. 
                        // [x]
                        // [x][x][x]
                        // [x]

                        _grid[y + 1][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        _grid[y + 1][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        // cursor.score += 200;
                        
                        return _grid;
                    } else if (x > 1 && checkingValue === _grid[y + 1][x - 1].value && checkingValue === _grid[y + 1][x - 2].value) {
                        // Solution 14: 5 matching blocks. 
                        //       [x]
                        // [x][x][x]
                        //       [x]

                        _grid[y + 1][x - 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        _grid[y + 1][x - 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        // cursor.score += 200;
                        
                        return _grid;
                    } else {
                        // return for solution 1. 
                        return _grid;
                    }
                }

                // Horizontal-starting solutions. 
                else if (x < 4 && checkingValue === _grid[y][x + 1].value && checkingValue === _grid[y][x + 2].value) {
                    // Solution 15: 3 matching horizontal. 
                    // [x][x][x]

                    for (let i = 0; i <= 2; i++) {
                        _grid[y][x + i] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];   
                    }
                    // cursor.score += 300;

                    if (x < 3 && checkingValue === _grid[y][x + 3].value) {
                        // Solution 16: 4 matching horizontal. 
                        // [x][x][x][x]

                        _grid[y][x + 3] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        // cursor.score += 100;

                        if (x < 2 && checkingValue === _grid[y][x + 4].value) {
                            // Solution 17: 5 matching horizontal. 
                            // [x][x][x][x][x]

                            _grid[y][x + 4] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            // cursor.score += 100;
                            if (y < 10 && checkingValue === _grid[y + 1][x + 2].value && checkingValue === _grid[y + 2][x + 2].value) {
                                // Solution 18: 7 matching. 
                                // [x][x][x][x][x]
                                //       [x]
                                //       [x]

                                _grid[y + 1][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                                _grid[y + 2][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                                // cursor.score += 200;
                                
                                return _grid;
                            } else {
                                // return value for solution 17. 
                                return _grid;
                            }
                        } else if (y < 10 && checkingValue === _grid[y + 1][x + 1].value && checkingValue === _grid[y + 2][x + 1].value) {
                            // Solution 19: 6 matching. 
                            // [x][x][x][x]
                            //    [x]
                            //    [x]

                            _grid[y + 1][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            _grid[y + 2][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            // cursor.score += 200;
                            
                            return _grid;
                        } else if (y < 10 && checkingValue === _grid[y + 1][x + 2].value && checkingValue === _grid[y + 2][x + 2].value) {
                            // Solution 20: 6 matching. 
                            // [x][x][x][x]
                            //       [x]
                            //       [x]

                            _grid[y + 1][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            _grid[y + 2][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            // cursor.score += 200;
                            
                            return _grid;
                        } else {
                            // return for solution 16. 
                            return _grid;
                        }
                    } else if (y < 10 && checkingValue === _grid[y + 1][x + 1].value && checkingValue === _grid[y + 2][x + 1].value) {
                        // Solution 16: 5 matching blocks. 
                        // [x][x][x]
                        //    [x]
                        //    [x]

                        _grid[y + 1][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        _grid[y + 2][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        // cursor.score += 200;
                        
                        return _grid;
                    } else if (y < 10 && checkingValue === _grid[y + 1][x + 2].value && checkingValue === _grid[y + 2][x + 2].value) {
                        // Solution 17: 5 matching blocks. 
                        //       [x]
                        //       [x]
                        // [x][x][x]

                        _grid[y + 1][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        _grid[y + 2][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                        // cursor.score += 200;
                        
                        return _grid;
                    } else {
                        // return for solution 15. 
                        return _grid;
                    }
                }  
            }
        });
    });

    return _grid;
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map