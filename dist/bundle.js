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
        this.soundEffectPlaying = false;
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
        if (this.soundEffectPlaying) {
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



document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.scale(60, 60);

    let gameOver = false;
    let startScreen = true;

    let audio = new _audio__WEBPACK_IMPORTED_MODULE_0__["default"]();
    let cursor = new _cursor__WEBPACK_IMPORTED_MODULE_1__["default"]();

    function randomBlock() {
        const blocks = "RYGBDP";
        return blocks[Math.floor(Math.random() * 6)];
    }

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

    let board = createBoard();

    function checkStartingClusters(grid) {
        let checking = true;
        while (checking) {
            checking = false;
            if (grid.length !== 13) {
                for (let i = 0; i < 6; i++) {
                    if ((i < 4 && grid[i] === grid[i + 1] && grid[i] === grid[i + 2]) || (grid[i] === board[12][i])) {
                        checking = true;
                        grid[i] = randomBlock();
                    } 
                }
            } else {
                grid.forEach((width, y) => {
                    width.forEach((value, x) => {
                        if (value !== 0) {
                            if ((x < 4 && value === grid[y][x + 1] && value === grid[y][x + 2]) || (y < 10 && value === grid[y + 1][x] && value === grid[y + 2][x])) {
                                grid[y][x] = randomBlock();
                                checking = true;
                        }
                    }
                });
            });
        }}
    }

    function createNextRow() {
        let nextRow = [];
        for (let i = 0; i < 6; i++) {
            nextRow.push(randomBlock());
        }
        checkStartingClusters(nextRow);
        return nextRow;
    }

    function swap(board, cursor) {
        let a = board[cursor.y][cursor.x];
        let b = board[cursor.y][cursor.x + 1];
        [a, b] = [b, a];
        board[cursor.y][cursor.x] = a;
        board[cursor.y][cursor.x + 1] = b;
        checkAndDeleteClusters(board);
    }

    function addRowToBoard(row, board) {
        board.shift();
        board.push(row);
        checkGameOver(board[0]);
        checkAndDeleteClusters(board);
    }

    function checkGameOver(row) {
        for (let i = 0; i < 6; i++) {
            if (row[i] !== 0) {
                gameOver = true;
            }
        }
    }

    function updateScore() {
        document.getElementById('score').innerText = cursor.score;
    }

    const BLOCKS = {
        "R": document.getElementById("red-block"),
        "Y": document.getElementById("yellow-block"),
        "G": document.getElementById("green-block"),
        "B": document.getElementById("blue-block"),
        "D": document.getElementById("dark-blue-block"),
        "P": document.getElementById("purple-block")
    };

    function drawBlock(block, y, x) {
        if (y !== 12) {
            ctx.drawImage(BLOCKS[block], 0.5, 0.5, 15, 15, x, y - yIncrease, 1, 1);
        } else {
            ctx.drawImage(BLOCKS[block], 15.5, 0.5, 15, 15, x, y - yIncrease, 1, 1);
        }
    }

    function drawCursor(y, x) {
        const cursorImg = document.getElementById("cursor");
        let yIncreaseCursor = yIncrease;
        if (y === 0) {
            yIncreaseCursor = 0;
        }
        ctx.drawImage(cursorImg, 1, 1, 36, 20, x, y - yIncreaseCursor, 2, 1);
    }

    function drawBoard(board) {
        board.forEach((row, y) => {
            row.forEach((block, x) => {
            if (block !== 0) {
                drawBlock(block, y, x);
            }});
        });
        drawCursor(cursor.y, cursor.x);
    }

    function checkAndDeleteNexusClustersLeftAndDown(position) {
        let y = position[0];
        let x = position[1];
        if (y < 10 && board[y][x] === board[y + 1][x] && board[y + 2][x]) {
            board[y + 1][x] = 0;
            board[y + 2][x] = 0;
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
            let pivot = board[y][x];
            if (x >= 2) {
                oneLeft = board[y][x - 1];
                twoLeft = board[y][x - 2];
                if (x <= 3) {
                    oneRight = board[y][x + 1];
                    twoRight = board[y][x + 2];
                    if (pivot === oneLeft && pivot === twoLeft && pivot === oneRight && pivot === twoRight) {
                        board[y][x - 1] = 0;
                        board[y][x - 2] = 0;
                        board[y][x + 1] = 0;
                        board[y][x + 2] = 0;
                        cursor.score += 700;
                    }
                } if (x <= 4) {
                    oneRight = board[y][x + 1];
                    if (pivot === oneLeft && pivot === twoLeft && pivot === oneRight) {
                        board[y][x - 1] = 0;
                        board[y][x - 2] = 0;
                        board[y][x + 1] = 0;
                        cursor.score += 500;
                    }
                } if (pivot === oneLeft && pivot === twoLeft) {
                    board[y][x - 1] = 0;
                    board[y][x - 2] = 0;
                    cursor.score += 200;
                }
            } if (x <= 3) {
                oneRight = board[y][x + 1];
                twoRight = board[y][x + 2];
                if (x >= 1) {
                    oneLeft = board[y][x - 1];
                    if (pivot === oneRight && pivot === twoRight && pivot === oneLeft) {
                        board[y][x + 1] = 0;
                        board[y][x + 1] = 0;
                        board[y][x + 2] = 0;
                        cursor.score += 500;
                    }
                } if (pivot === oneRight && pivot === twoRight) {
                    board[y][x + 1] = 0;
                    board[y][x + 2] = 0;
                    cursor.score += 200;
                }
            } if (x >= 1 && x <= 4 && increment === 3) {
                oneRight = board[y][x + 1];
                oneLeft = board[y][x - 1];
                if (pivot === oneRight && pivot === oneLeft) {
                    board[y][x + 1] = 0;
                    board[y][x - 1] = 0;
                    cursor.score += 200;
                }
            }
        }
    }

    function checkStartingPointHorizontal(row, col) {
        if (board[row][col] === board[row][col - 1] && board[row - 1][col] !== board[row][col]) {
            let col2 = col - 1;
            return checkStartingPointHorizontal(row, col2);
        } else {
            return [row, col];
        }

    }

    function checkStartingPointVertical(row, col) {
        if ((board[row][col] === board[row - 1][col] && board[row][col] === board[row + 1][col]) || (board[row][col] === board[row - 1][col] && board[row][col] === board[row - 2][col]))  {
            let row2 = row - 1;
            return checkStartingPointVertical(row2, col);
        } else {
            return [row, col];
        }
    }

    function checkAndDeleteClusters(board) {
        for (let rowY = 0; rowY < 12; rowY++) {
            for (let colX = 0; colX < 6; colX++) {
                if (board[rowY][colX] !== 0 && board[rowY + 1][colX] !== 0 && !gameOver) {
                    let col = checkStartingPointHorizontal(rowY, colX)[1];
                    let row = checkStartingPointVertical(rowY, col)[0];
                    let pivot = board[row][col];
                    let oneBelow;
                    let twoBelow;
                    let threeBelow;
                    let fourBelow;
                    let oneRight;
                    let twoRight;
                    let threeRight;
                    let fourRight;
                        if (row < 8) {
                            oneBelow = board[row + 1][col];
                            twoBelow = board[row + 2][col];
                            threeBelow = board[row + 3][col];
                            fourBelow = board[row + 4][col];
                            if (pivot === oneBelow && pivot === twoBelow && pivot === threeBelow && pivot === fourBelow) {
                                checkAndDeleteNexusClusters([row + 2, col], 1);
                                for (let i = 0; i < 5; i++) {
                                    board[row + i][col] = 0;
                                } cursor.score += 700;
                                audio.playSoundEffect();
                            }
                        }
                        if (row < 9) {
                            oneBelow = board[row + 1][col];
                            twoBelow = board[row + 2][col];
                            threeBelow = board[row + 3][col];
                            if (pivot === oneBelow && pivot === twoBelow && pivot === threeBelow) {
                                checkAndDeleteNexusClusters([row + 1, col], 2);
                                for (let i = 0; i < 4; i++) {
                                    board[row + i][col] = 0;
                                } cursor.score += 300;
                                audio.playSoundEffect();
                            }
                        }
                        if (row < 10) {
                            oneBelow = board[row + 1][col];
                            twoBelow = board[row + 2][col];
                            
                            if (pivot === oneBelow && pivot === twoBelow) {
                                
                                checkAndDeleteNexusClusters([row, col], 3);
                                for (let i = 0; i < 3; i++) {
                                    board[row + i][col] = 0;
                                    
                                } cursor.score += 100;
                                audio.playSoundEffect();
                            }
                        }
                        if (col < 2) {
                            oneRight = board[row][col + 1];
                            twoRight = board[row][col + 2];
                            threeRight = board[row][col + 3];
                            fourRight = board[row][col + 4];
                            if (pivot === oneRight && pivot === twoRight && pivot === threeRight && pivot === fourRight && board[row + 1][col + 1] !== 0 && board[row + 1][col + 2] !== 0 && board[row + 1][col + 3] !== 0 && board[row + 1][col + 4] !== 0) {
                                for (let i = 0; i < 5; i++) {
                                    board[row][col + i] = 0;
                                } cursor.score += 700;
                                audio.playSoundEffect();
                            }} if (col < 3) {
                            oneRight = board[row][col + 1];
                            twoRight = board[row][col + 2];
                            threeRight = board[row][col + 3];
                            if (pivot === oneRight && pivot === twoRight && pivot === threeRight && board[row + 1][col + 1] !== 0 && board[row + 1][col + 2] !== 0 && board[row + 1][col + 3] !== 0) {
                                for (let i = 0; i < 4; i++) {
                                    board[row][col + i] = 0;
                                } cursor.score += 300;
                                audio.playSoundEffect();
                            }
                            } if (col < 4) {
                            oneRight = board[row][col + 1];
                            twoRight = board[row][col + 2];
                            if (pivot === oneRight && pivot === twoRight && board[row + 1][col + 1] !== 0 && board[row + 1][col + 2] !== 0) {
                                checkAndDeleteNexusClustersLeftAndDown([row, col + 2]);
                                for (let i = 0; i < 3; i++) {
                                    board[row][col + i] = 0;
                                } cursor.score += 100;
                                audio.playSoundEffect();
                            }
                        }
                    }
                }
        }
    }

    function fall(board) {
        board.forEach((row, y) => {
            row.forEach((val, x) => {
                if (y < 11 && board[y + 1][x] === 0 && val !== 0) {
                    board[y + 1][x] = val;
                    board[y][x] = 0;
                }
            });
        });
        checkAndDeleteClusters(board);
    }

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
            if (startScreen || gameOver) {
                startScreen = false;
                gameOver = false;
                cursor.score = 0;
                board = createBoard();
                yIncrease = 0;
                audio.musicPlaying = true;
                audio.playMusic();
            } else {
                swap(board, cursor);
            }
        } else if (event.keyCode === 90) {
            addRowToBoard(createNextRow(), board);
        } else if (event.keyCode === 83) {
            audio.musicPlaying = !audio.musicPlaying;
            audio.playMusic();
        }
    });

    let increaseInterval = 5000;
    let yIncrease = 0;

    function increaseY() {
        yIncrease += (1/50);
        if (yIncrease >= 1) {
            addRowToBoard(createNextRow(), board);
            if (cursor.y !== 0) {
                cursor.y--;
            }
            yIncrease = 0;
        }
    }

    setInterval(increaseY, (increaseInterval/50));

    function update() {
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
        } else if (!gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fall(board);
            drawBoard(board);
            updateScore();
            checkGameOver(board[0]);
        } else if (gameOver) {
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
    }

    window.board = board;

    audio.playMusic();
    update();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map