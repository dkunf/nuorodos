import { backTickToArray } from "./utils.mjs";
import { gameControls } from "./controls.mjs";
import { patterns } from "./patterns.mjs";

//default values if I cannot get console size
let totalColumns = 20;
let totalRows = 10;
//check what's the size of console now and use those instead
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
      field.push(new Array(this.columns).fill(EMPTY_CELL));
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

let nrOfStars = 10;
const arrayOfStars = Array(nrOfStars);
for (let i = 0; i < nrOfStars; i++) {
  let x = Math.round(totalColumns * Math.random());
  let y = Math.round(4 * Math.random());
  arrayOfStars.push(new GameObject(patterns.star, x, y));
}
//it's funny to escape backslashes :)

let center = Math.round(totalColumns / 2);
const spaceShip = new GameObject(patterns.spaceShip, center, totalRows - 8);

setTimeout(() => {
  let count = totalRows;
  while (count > -10) {
    setTimeout(() => {
      arrayOfStars.forEach((star) => star.move(0, 1));

      if (count % 3) {
        arrayOfStars.push(
          new GameObject(
            patterns.star,
            Math.round(totalColumns * Math.random()),
            Math.round(4 * Math.random())
          )
        );
      }
    }, 2000 + count * 200);
    count--;
  }
}, 2500);

//listens and reacts to left,right,down,up as asked in provided functions, and also q for exit
gameControls({
  left: () => spaceShip.move(-3, 0),
  right: () => spaceShip.move(3, 0),
  up: () => spaceShip.move(0, -3),
  down: () => spaceShip.move(0, 3),
});
