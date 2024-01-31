// Define a function that modifies an object
function modifyObject(obj) {
  obj.prop = "modified";
}

// Create an object
let myObj = { prop: "original" };

// Call the function modifyObject and pass the object
modifyObject(myObj);

console.log(myObj); // Output: { prop: 'modified' }

//------------------------------------------------------------

// Define a function that reassigns a new object to the parameter
function reassignObject(obj) {
  obj = { newProp: "new value" };
}

// Create an object
let myObj2 = { prop: "original" };

// Call the function reassignObject and pass the object
reassignObject(myObj2);

// This reassignment doesn't affect the original myObj object outside
//  the function because obj is just a local reference to the original
// object passed as an argument.

console.log(myObj2); // Output: { prop: 'original' }

//-----------------------------------------------------------------
//what about returning modified value without changing original?
// Define a function that modifies an object and returns a modified copy
function modifyAndReturnCopy(obj) {
  // Create a new object with all properties of the original object
  const modifiedObj = { ...obj };
  // const modifiedObj = Object.assign({}, obj); //also works
  //or use lodash library
  // const _ = require('lodash');
  // const modifiedObj = _.cloneDeep(obj);
  //---------------
  //or even like that
  // return _.chain(obj)
  // .cloneDeep() // Create a deep copy
  // .set('nestedObj.nestedArray[0].nestedProp', 'modified') // Modify deeply nested property
  // .value(); // Extract the value from the chain
  //--------------------------------
  // Modify the new object
  modifiedObj.prop = "modified";

  // Return the modified copy
  return modifiedObj;
}

// Create an object
let myObj3 = { prop: "original" };

// Call the function and pass the object
let modifiedCopy = modifyAndReturnCopy(myObj3);

console.log(myObj3); // Output: { prop: 'original' }
console.log(modifiedCopy); // Output: { prop: 'modified' }
