# BlockAttack

### Background

BlockAttack is a JavaScript game inspired by [Tetris Attack](https://www.youtube.com/watch?v=c8FtDgDPTbY&t=136s). Using a cursor, a player navigates a 6x12 grid and flips the position of two blocks. If three or more blocks of the same color form a horizontal or verticle line, the blocks disappear, and the player is awarded points. As the time increases, the speed at which new blocks are added increases. Once the player's blocks hit the top of the grid, they lose. 

### Functionality & MVP  

With Block Attack, users will be able to:

- [ ] Start, pause, and reset the game
- [ ] Choose a difficulty and speed at the beginning

In addition, this project will include:

- [ ] A modal that allows users to set the difficulty/speed of the game and that describes the rules
- [ ] A production README

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github and my LinkedIn; additionally, the screen will have an instructions modal that also allows the player to set the speed and difficulty at the start.  Game controls will include start, pause, and reset, the direction arrows to navigate the grid, and an input which switches the blocks highlighted by the grid. (Additionally, if there is music, there will be a button to toggle on and off the music.) These controlls will be displayed on the left; my personal links will be displayed on the right. 

![wireframe](./assets/images/wireframe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- `JavaScript`
- `HTML Canvas`

In addition to the entry file, the following scripts will be involved with the project:

`board.js`: this script will populate the board with the `block.js` elements, and will determine if a player has scored.

`block.js`: this script will hold the information about a block's attributes. 

`cursor.js`: this script will allow the player to navigate around the board and flip blocks. 

### Implementation Timeline

**Day 1**: Setup all necessary Node modules and write a basic entry file and the bare bones of all 3 scripts outlined above. 

**Day 2**: Create `block.js`, and use it to populate a randomized starting grid for `board.js`. 

**Day 3**: In `board.js`, write the logic to determine if three or more blocks of the same color are aligned, and write the logic that determines the number of points based on combos. Write the `cursor.js` logic to allow the player to interact witht he game. 

**Day 4**: Install the controls for the user to interact with the game.  Style the frontend, making it polished and professional. 


### Bonus features

- [ ] Add falling blocks at incremented intervals and with random heights and widths that can be broken apart by combos
- [ ] Add a computer opponent or multiplayer option# Block-Attack
