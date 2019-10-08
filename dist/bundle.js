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
    constructor() {
        this.music = document.getElementById("music");
        this.soundEffect = document.getElementById("sound-effect");
        this.musicPlaying = false;
    }

    playMusic() {
        if (!this.musicPlaying) {
            this.music.pause();
            this.music.currentTime = 0;
        } else {
            this.music.play();
        }
    }

    playSoundEffect() {
        if (this.musicPlaying) {
            this.soundEffect.play();
            setTimeout(() => {
                this.soundEffect.pause();
                this.soundEffect.currentTime = 0;
            }, 450);
        }
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
        this.grid.shift();
        this.grid.push(nextRow);
        this.checkGameOver();
        this.grid = Object(_solutions__WEBPACK_IMPORTED_MODULE_2__["clearSolutions"])(this.grid);
    }

    swap(y, x) {
        let a = this.grid[y][x];
        let b = this.grid[y][x + 1];
        [a, b] = [b, a];
        this.grid[y][x] = a;
        this.grid[y][x + 1] = b;
        this.grid = Object(_solutions__WEBPACK_IMPORTED_MODULE_2__["clearSolutions"])(this.grid);
    }

    fall() {
        this.grid.forEach((row, y) => {
            row.forEach((block, x) => {
                if (y < 11 && !this.grid[y + 1][x].value && block.value) {
                    this.grid[y + 1][x] = block;
                    this.grid[y][x] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                }
            });
        });
        this.grid = Object(_solutions__WEBPACK_IMPORTED_MODULE_2__["clearSolutions"])(this.grid);
    }

    checkGameOver() {
        for (let i = 0; i < 6; i++) {
            if (this.grid[0][i].value) {
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
/* harmony import */ var _audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio */ "./src/audio.js");
/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cursor */ "./src/cursor.js");
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./board */ "./src/board.js");




// webpack --watch --mode=development

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.scale(60, 60);

    let cursor = new _cursor__WEBPACK_IMPORTED_MODULE_1__["default"]();
    let board = new _board__WEBPACK_IMPORTED_MODULE_2__["default"]();
    let audio = new _audio__WEBPACK_IMPORTED_MODULE_0__["default"]();

    let startScreen = true;

    const updateScore = () => document.getElementById('score').innerText = cursor.score;

    const BLOCKS = {
        "R": document.getElementById("red-block"),
        "Y": document.getElementById("yellow-block"),
        "G": document.getElementById("green-block"),
        "B": document.getElementById("blue-block"),
        "D": document.getElementById("dark-blue-block"),
        "P": document.getElementById("purple-block")
    };

    const drawBlock = (color, y, x) => {
        if (y !== 12) {
            ctx.drawImage(BLOCKS[color], 0.5, 0.5, 15, 15, x, y - yIncrease, 1, 1);
        } else {
            ctx.drawImage(BLOCKS[color], 15.5, 0.5, 15, 15, x, y - yIncrease, 1, 1);
        }
    };

    const drawCursor = (y, x) => {
        const cursorImg = document.getElementById("cursor");
        let yIncreaseCursor = yIncrease;
        if (y === 0) {
            yIncreaseCursor = 0;
        }
        ctx.drawImage(cursorImg, 1, 1, 36, 20, x, y - yIncreaseCursor, 2, 1);
    };

    const drawBoard = board => {
        board.forEach((row, y) => {
            row.forEach((block, x) => {
            if (block.value) {
                drawBlock(block.value, y, x);
            }});
        });
    };

    const draw = () => {
        drawBoard(board.grid);
        drawCursor(cursor.y, cursor.x);
    };

    document.addEventListener('keydown', event => {
        if (event.keyCode === 37) {
            cursor.move(0, -1);
        } else if (event.keyCode === 38) {
            event.preventDefault();
            cursor.move(-1, 0);
        } else if (event.keyCode === 39) {
            cursor.move(0, 1);
        } else if (event.keyCode === 40) {
            event.preventDefault();
            cursor.move(1, 0);
        } else if (event.keyCode === 32) {
            if (startScreen || board.gameOver) {
                startScreen = false;
                board.gameOver = false;
                cursor = new _cursor__WEBPACK_IMPORTED_MODULE_1__["default"]();
                board = new _board__WEBPACK_IMPORTED_MODULE_2__["default"]();
                yIncrease = 0;
                audio.musicPlaying = true;
                audio.playMusic();
            } else {
                board.swap(cursor.y, cursor.x);
            }
        } else if (event.keyCode === 90) {
            board.createNextRow();
        } else if (event.keyCode === 83) {
            audio.musicPlaying = !audio.musicPlaying;
            audio.playMusic();
        }
    });

    let increaseInterval = 5000;
    let yIncrease = 0;

    const increaseY = () => {
        yIncrease += (1/50);
        if (yIncrease >= 1) {
            board.createNextRow();
            if (cursor.y !== 0) {
                cursor.y--;
            }
            yIncrease = 0;
        }
    };

    setInterval(increaseY, (increaseInterval/50));

    const update = () => {
        if (startScreen) {
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
        } else if (!board.gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            board.fall();
            draw();
            updateScore();
            board.checkGameOver();
        } else if (board.gameOver) {
            audio.musicPlaying = false;
            audio.playMusic();
            audio.music.currentTime = 0;
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
            ctx.fillText(cursor.score, 3, 6);
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.fillText("Press space", 0.3, 8);
            ctx.fillText("to play", 0.3, 9);
            ctx.fillText("again!", 0.3, 10);
        }
        requestAnimationFrame(update);
    };
    // what is this line??
    // window.board = board;

    audio.playMusic();
    update();
});

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

function clearSolutions(grid) {
    // Clear any solutions on grid after swap, fall, or new row, return new grid.
    let _grid = grid;
    for (let y = 0; y < 12; y++) {
        for (let x = 0; x < 6; x++) {
            if (_grid[y][x].value && _grid[y + 1][x].value) {
                let col = checkStartingPointHorizontal(y, x)[1];
                let row = checkStartingPointVertical(y, col)[0];
                let pivot = _grid[row][col].value;
                let oneBelow;
                let twoBelow;
                let threeBelow;
                let fourBelow;
                let oneRight;
                let twoRight;
                let threeRight;
                let fourRight;
                    if (row < 8) {
                        oneBelow = _grid[row + 1][col].value;
                        twoBelow = _grid[row + 2][col].value;
                        threeBelow = _grid[row + 3][col].value;
                        fourBelow = _grid[row + 4][col].value;
                        if (pivot === oneBelow && pivot === twoBelow && pivot === threeBelow && pivot === fourBelow) {
                            checkAndDeleteNexusClusters([row + 2, col], 1);
                            for (let i = 0; i < 5; i++) {
                                _grid[row + i][col] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            } cursor.score += 700;
                            audio.playSoundEffect();
                        }
                    }
                    if (row < 9) {
                        oneBelow = _grid[row + 1][col].value;
                        twoBelow = _grid[row + 2][col].value;
                        threeBelow = _grid[row + 3][col].value;
                        if (pivot === oneBelow && pivot === twoBelow && pivot === threeBelow) {
                            checkAndDeleteNexusClusters([row + 1, col], 2);
                            for (let i = 0; i < 4; i++) {
                                _grid[row + i][col] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            } cursor.score += 300;
                            audio.playSoundEffect();
                        }
                    }
                    if (row < 10) {
                        oneBelow = _grid[row + 1][col].value;
                        twoBelow = _grid[row + 2][col].value;
                        
                        if (pivot === oneBelow && pivot === twoBelow) {
                            
                            checkAndDeleteNexusClusters([row, col], 3);
                            for (let i = 0; i < 3; i++) {
                                _grid[row + i][col] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                                
                            } cursor.score += 100;
                            audio.playSoundEffect();
                        }
                    }
                    if (col < 2) {
                        oneRight = _grid[row][col + 1].value;
                        twoRight = _grid[row][col + 2].value;
                        threeRight = _grid[row][col + 3].value;
                        fourRight = _grid[row][col + 4].value;
                        if (pivot === oneRight && pivot === twoRight && pivot === threeRight && pivot === fourRight && _grid[row + 1][col + 1].value && _grid[row + 1][col + 2].value && _grid[row + 1][col + 3].value && _grid[row + 1][col + 4].value) {
                            for (let i = 0; i < 5; i++) {
                                _grid[row][col + i] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            } cursor.score += 700;
                            audio.playSoundEffect();
                        }} if (col < 3) {
                        oneRight = _grid[row][col + 1].value;
                        twoRight = _grid[row][col + 2].value;
                        threeRight = _grid[row][col + 3].value;
                        if (pivot === oneRight && pivot === twoRight && pivot === threeRight && _grid[row + 1][col + 1].value && _grid[row + 1][col + 2].value && _grid[row + 1][col + 3].value) {
                            for (let i = 0; i < 4; i++) {
                                _grid[row][col + i] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            } cursor.score += 300;
                            audio.playSoundEffect();
                        }
                        } if (col < 4) {
                        oneRight = _grid[row][col + 1].value;
                        twoRight = _grid[row][col + 2].value;
                        if (pivot === oneRight && pivot === twoRight && _grid[row + 1][col + 1].value && _grid[row + 1][col + 2].value) {
                            checkAndDeleteNexusClustersLeftAndDown([row, col + 2]);
                            for (let i = 0; i < 3; i++) {
                                _grid[row][col + i] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                            } cursor.score += 100;
                            audio.playSoundEffect();
                        }
                    }
                }
        }
    }
    return _grid;
}


// FIX THIS

function checkAndDeleteNexusClustersLeftAndDown(position) {
    let y = position[0];
    let x = position[1];
    if (y < 10 && grid[y][x].value === grid[y + 1][x].value && grid[y + 2][x].value) {
        board[y + 1][x] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
        board[y + 2][x] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
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
                    board[y][x - 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                    board[y][x - 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                    board[y][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                    board[y][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                    cursor.score += 700;
                }
            } if (x <= 4) {
                oneRight = board[y][x + 1].value;
                if (pivot === oneLeft && pivot === twoLeft && pivot === oneRight) {
                    board[y][x - 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                    board[y][x - 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                    board[y][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                    cursor.score += 500;
                }
            } if (pivot === oneLeft && pivot === twoLeft) {
                board[y][x - 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                board[y][x - 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                cursor.score += 200;
            }
        } if (x <= 3) {
            oneRight = board[y][x + 1].value;
            twoRight = board[y][x + 2].value;
            if (x >= 1) {
                oneLeft = board[y][x - 1].value;
                if (pivot === oneRight && pivot === twoRight && pivot === oneLeft) {
                    board[y][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                    board[y][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                    board[y][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                    cursor.score += 500;
                }
            } if (pivot === oneRight && pivot === twoRight) {
                board[y][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                board[y][x + 2] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                cursor.score += 200;
            }
        } if (x >= 1 && x <= 4 && increment === 3) {
            oneRight = board[y][x + 1].value;
            oneLeft = board[y][x - 1].value;
            if (pivot === oneRight && pivot === oneLeft) {
                board[y][x + 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                board[y][x - 1] = _singleton__WEBPACK_IMPORTED_MODULE_1__["default"];
                cursor.score += 200;
            }
        }
    }
}


function checkStartingPointHorizontal(row, col) {
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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map