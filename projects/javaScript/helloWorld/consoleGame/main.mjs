import { backTickToArray } from "./utils.mjs";

// Define constants for the game
const EMPTY_CELL = "-";

// Define the game field model
const gameField = {
  rows: 10,
  columns: 20,
  field: [],

  // Initialize an empty game field
  initializeField() {
    const field = [];
    for (let i = 0; i < this.rows; i++) {
      field.push(new Array(this.columns).fill(EMPTY_CELL));
    }
    return field;
  },

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
  },

  // Clear the cells previously occupied by the object
  clearObject: function (object) {
    for (let i = 0; i < object.height; i++) {
      for (let j = 0; j < object.width; j++) {
        const row = object.x + i;
        const col = object.y + j;

        if (row >= 0 && row < this.rows && col >= 0 && col < this.columns) {
          this.field[row][col] = EMPTY_CELL;
        }
      }
    }
  },

  // Render the current state of the game field
  render() {
    console.clear();
    for (let i = 0; i < this.rows; i++) {
      console.log(this.field[i].join(""));
    }
  },
};

gameField.field = gameField.initializeField();

// Define the game object model
class GameObject {
  constructor(pattern, x, y) {
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
  move(dx, dy) {
    gameField.clearObject(this);

    this.x += dy;
    this.y += dx;

    gameField.updateObject(this);
    gameField.render();
  }
}

// Example usage:
// const gameField = new GameField(10, 20);

//can be also defined as template string
const playerPattern = [
  ["-", "*", "*", "*", "-"],
  ["-", "*", "-", "*", "-"],
  ["-", "*", "*", "*", "-"],
];

const player = new GameObject(playerPattern, 1, 1);

const obstaclePattern = `
xxxx
xxxx
`;

const obstacle = new GameObject(obstaclePattern, 7, 7);

setTimeout(() => {
  player.move(4, 3);
  obstacle.move(2, 0);
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
