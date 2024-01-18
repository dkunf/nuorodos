//looks like it doesn't make sense to compose functions which have mixed nr of args
//so first we curry functions with more arguments and then compose them
//this should work!

// Curry function to transform a function with multiple arguments into a series of functions
//curry bind creates new function with prefilled some of needed argument so that later it can be invoked
//with the rest of arguments
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

// Functions for processing numbers
const double = curry((x) => x * 2);
const square = curry((x) => x ** 2);
const add = curry((x, y) => x + y);

// Function composition utility
const compose =
  (...functions) =>
  (input) =>
    functions.reduceRight((acc, fn) => fn(acc), input);

// Curry and then compose functions
const processNumber = compose(add(5), double, square);

// Example usage
const result = processNumber(3);
console.log(result); // Output: (3^2) * 2 + 5 = 23
