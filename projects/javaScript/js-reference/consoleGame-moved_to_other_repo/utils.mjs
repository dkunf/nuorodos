//i want to create function that would translate object visualization
//  from backtick notation into array notation, that would make easier

// there is problem: need to escape some symbols like this spaceShip:

// const spaceShipPattern = `
//   |
//  /_\\
// ( o )
//  | |
// / | \\
// `;

// console.log(backTickToArray(spaceShipPattern));

//maybe it should be coupled with patterns.mjs as a method of patterns object?
export function backTickToArray(pattern) {
  let flatArray = pattern.split("\n");
  let len = flatArray.length;
  //we need to remove first and last element
  flatArray = flatArray.slice(1, len - 1);
  //now every element supposed to have same length
  let finalPatternArray = [];
  let simmetryFlag = true;
  let firstElLen = flatArray[0].length;
  for (let i = 0; i < len - 2; i++) {
    if (firstElLen !== flatArray[i].length) {
      simmetryFlag = false;
      // console.log(i);
    }
    finalPatternArray.push(flatArray[i].split(""));
  }
  // if (!simmetryFlag) return "object's dimensions are not simmetrical";
  return finalPatternArray;
}
