// Exercise 1: Simple Promise
// Create a function delayedGreeting that returns a Promise.
// The Promise should resolve with the message "Hello after 2 seconds." after a delay of 2000 milliseconds.
// Usage:

delayedGreeting()
  .then((message) => console.log(message))
  .catch((error) => console.error(error));

function delayedGreeting() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello after 2 seconds.");
    }, 2000);
  });
}

// -----------------------------------------------------------------
// Exercise 2: Promise with Conditional Resolution
// Create a function randomNumberPromise that returns a Promise.
// The Promise should resolve with a random number between 1 and 10.
// If the generated number is greater than 5, resolve the Promise; otherwise, reject it.
// Usage:

randomNumberPromise()
  .then((number) => console.log("Resolved:", number))
  .catch((error) => console.error("Rejected:", error));

function randomNumberPromise() {
  return new Promise((resolve, reject) => {
    const rnd = Math.ceil(Math.random() * 10);
    setTimeout(() => {
      if (rnd > 5) resolve(rnd);
      else reject(new Error("too small random number!!"));
    }, 1000);
  });
}
// ----------------------------------------------------------------------------
// Exercise 3: Chaining Promises

// Create two functions, getUserData and getUserDetails, both returning Promises.
// getUserData should resolve with an object containing user data (e.g., { id: 123, name: "John" }).
// getUserDetails should resolve with additional details based on the user ID.
// Chain these two promises to get and log the combined user information.

// Usage:
let userData;

getUserData()
  .then((userData) => getUserDetails(userData.id))
  .then((userDetails) =>
    console.log("Combined User Information:", { ...userData, ...userDetails })
  )
  .catch((error) => console.error("Error:", error));

function getUserData(userId = 325) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      userData = { id: userId, name: "John" };
      resolve(userData);
    }, 600);
  });
}
function getUserDetails(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ surname: "Wick", died: "not yet..." });
    }, 600);
  });
}

//or another way to use chain of promises without global var is to return from first .then object with data and promise:

getUserData()
  .then((userData2) => {
    // Pass userData to the next then block
    return {
      userData2: userData2,
      userDetailsPromise: getUserDetails(userData2.id),
    };
  })
  //get returned data from prev .then and destructure object
  .then(({ userData2, userDetailsPromise }) =>
    userDetailsPromise.then((userDetails) => {
      console.log("Combined User Information:", {
        ...userData2,
        ...userDetails,
      });
    })
  )
  .catch((error) => console.error("Error:", error));

//and yet another valid way:
getUserData(123)
  .then((userData3) => {
    return getUserDetails(userData3.id).then((details) =>
      console.log("User Details:", { ...userData3, ...details })
    );
  })
  .catch((err) => console.error(err));

// but the best way totally avoiding scope problems is this
// (async () => {
//   const userData = await fetchUserDataPromise(123);
//   const details = await fetchDetailsPromise(userData.id);
//   console.log("User Details:", { ...userData, ...details });
// })();
