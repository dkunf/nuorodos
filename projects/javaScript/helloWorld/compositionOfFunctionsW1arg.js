// Functions for processing numbers
const double = (x) => x * 2;
const square = (x) => x * x;
const rndMult = (x) => x * Math.random();
// const add = (x, y) => x + y;

// Function composition utility, which expects only functions with single argument
const compose =
  (...functions) =>
  (input) =>
    functions.reduceRight((acc, fn) => fn(acc), input);

// Compose functions to create a new function
const processNumber = compose(double, square);

// Example usage. Only first parameter is taken, the rest ignored...
const result = processNumber(3, 4, 2, 6);
console.log(result); // Output:
