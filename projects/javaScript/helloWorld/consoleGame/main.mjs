import { backTickToArray } from "./utils.mjs";

let totalColumns = 20;
let totalRows = 10;
//check what's the size of console now
if (process.stdout.columns && process.stdout.rows) {
  totalColumns = process.stdout.columns;
  totalRows = process.stdout.rows - 1; //otherwise scrolls
}

// Define constants for the game
const EMPTY_CELL = " ";
const COLUMNS = totalColumns;
const ROWS = totalRows;

// Define the game field model
const gameField = {
  rows: ROWS,
  columns: COLUMNS,
  field: [],

  // Initialize an empty game field
  initializeField() {
    const field = [];
    for (let i = 0; i < this.rows; i++) {
      if (i === 0 || i === this.rows - 1)
        field.push(new Array(this.columns).fill("-"));
      else field.push(new Array(this.columns).fill(EMPTY_CELL));

      field[i][0] = "|";
      field[i][this.columns - 1] = "|";
    }
    return field;
  },

  // Update the cells based on the object's dimensions and position
  updateObject(object) {
    for (let i = 0; i < object.height; i++) {
      for (let j = 0; j < object.width; j++) {
        const row = object.y + i;
        const col = object.x + j;

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
        const row = object.y + i;
        const col = object.x + j;

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

    this.x += dx;
    this.y += dy;

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

const player = new GameObject(playerPattern, 20, 20);

const obstaclePattern = `
xxxx
xxxx
`;

const obstacle = new GameObject(obstaclePattern, 12, 7);

const robotPattern = `
R
`;
const robot = new GameObject(robotPattern, 5, 5);

//it's funny to escape backslashes :)
const spaceShipPattern = `
  |   
 /_\\  
( o ) 
 | |  
/ | \\ 
`;

const spaceShip = new GameObject(spaceShipPattern, 30, 30);

const gasPattern = `
 | |
 ~ ~
`;
let gas;

setTimeout(() => {
  player.move(4, 3);
  obstacle.move(2, 0);
  robot.move(7, 1);
  gas = new GameObject(gasPattern, 30, 35);
}, 2000);

setTimeout(() => {
  player.move(4, 3);
  obstacle.move(2, 0);
  robot.move(7, 1);
  spaceShip.move(0, -2);
  gas.move(0, -1);
}, 2500);
setTimeout(() => {
  player.move(4, 3);
  obstacle.move(2, 0);
  robot.move(7, 1);
  spaceShip.move(0, -2);
  gameField.clearObject(gas);
  gameField.render();
}, 3000);
setTimeout(() => {
  spaceShip.move(0, -6);
}, 3500);

setTimeout(() => {
  let count = spaceShip.y;
  while (count > 1) {
    setTimeout(() => {
      spaceShip.move(0, -1);
    }, 1000 + count * 150);
    count--;
  }
}, 4000);
