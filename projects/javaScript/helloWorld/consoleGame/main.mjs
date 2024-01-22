import { backTickToArray } from "./utils.mjs";

// Define constants for the game
const EMPTY_CELL = "-";

// Define the game field model
class GameField {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.field = this.initializeField();
  }

  // Initialize an empty game field
  initializeField() {
    const field = [];
    for (let i = 0; i < this.rows; i++) {
      field.push(new Array(this.columns).fill(EMPTY_CELL));
    }
    return field;
  }

  // Update the cells based on the object's dimensions and position
  updateObject(object) {
    for (let i = 0; i < object.height; i++) {
      for (let j = 0; j < object.width; j++) {
        const row = object.x + i;
        const col = object.y + j;

        if (row >= 0 && row < this.rows && col >= 0 && col < this.columns) {
          const visualChar = object.pattern[i][j];
          this.field[row][col] =
            visualChar !== undefined ? visualChar : EMPTY_CELL;
        }
      }
    }
  }

  // Clear the cells previously occupied by the object
  clearObject(object) {
    for (let i = 0; i < object.height; i++) {
      for (let j = 0; j < object.width; j++) {
        const row = object.x + i;
        const col = object.y + j;

        if (row >= 0 && row < this.rows && col >= 0 && col < this.columns) {
          this.field[row][col] = EMPTY_CELL;
        }
      }
    }
  }

  // Render the current state of the game field
  render() {
    console.clear();
    for (let i = 0; i < this.rows; i++) {
      console.log(this.field[i].join(""));
    }
  }
}

// Define the game object model
class GameObject {
  constructor(pattern, x, y, gameField) {
    if (typeof pattern === "string") pattern = backTickToArray(pattern);
    this.pattern = pattern;
    this.height = pattern.length;
    this.width = pattern[0].length;
    this.x = x;
    this.y = y;

    gameField.updateObject(this);
    gameField.render(this);
  }

  // Move the object based on a direction vector (dx, dy)
  move(dx, dy, gameField) {
    gameField.clearObject(this);

    this.x += dy;
    this.y += dx;

    gameField.updateObject(this);
    gameField.render();
  }
}

// Example usage:
const gameField = new GameField(10, 20);

//can be also defined as template string
const playerPattern = [
  ["-", "*", "*", "*", "-"],
  ["-", "*", "-", "*", "-"],
  ["-", "*", "*", "*", "-"],
];

const player = new GameObject(playerPattern, 1, 1, gameField);

const obstaclePattern = `
xxxx
xxxx
`;

const obstacle = new GameObject(obstaclePattern, 7, 7, gameField);

setTimeout(() => {
  player.move(4, 3, gameField);
  obstacle.move(2, 0, gameField);
}, 2000);

// gameField.updateObject(player);
// gameField.render();

// Clear the previous position of the player
// gameField.clearObject(player);

// Move the player diagonally down-right using a vector

// Update and render the new position of the player
// gameField.updateObject(player);
// setTimeout(() => {
//   gameField.render();
// }, 3000);
// gameField.updateObject(obstacle);
// gameField.render();

// Clear the previous position of the player
// gameField.clearObject(obstacle);

// Move the player diagonally down-right using a vector
// gameField.updateObject(obstacle);
