// Exercise 1: Basic Callback to Promise Conversion
// Convert the following callback-based function into a Promise-based one:
// Your task is to convert the fetchData function into a Promise-based version.

function fetchData(callback) {
  // Simulating asynchronous operation (e.g., fetching data from an API)
  setTimeout(() => {
    const data = "Hello, this is your data!";
    callback(null, data);
  }, 1000);
}

// Usage
fetchData((error, data) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Data:", data);
  }
});

function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = "Hello, this is your data!";
      resolve(data);
      // In a real-world scenario, you might have conditions for rejection:
      // if (someCondition) {
      //   reject(new Error("Some error message"));
      // }
    }, 1000);
  });
}

fetchDataPromise()
  .then((data) => {
    console.log("Data:", data);
  })
  .catch((err) => console.log("Error:", err));

// ---------------------------------------------------------------

// Exercise 2: Handling Errors with Promises
// Extend the previous example by handling errors. Modify the Promise-based function to reject the Promise in case of an error.
// Convert the fetchData function into a Promise-based version that properly handles errors.
function fetchData2(callback) {
  // Simulating an error during asynchronous operation
  setTimeout(() => {
    const error = new Error("Something went wrong!");
    callback(error, null);
  }, 1000);
}

// Usage
fetchData2((error, data) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Data:", data);
  }
});

function fetchData2Promise() {
  return new Promise((resolve, reject) => {
    // Simulating an error during asynchronous operation
    setTimeout(() => {
      const error = new Error("Something went wrong!");
      reject(error);
    }, 1000);
  });
}

fetchData2Promise()
  .then((data) => console.log(data))
  .catch((err) => console.log("error: ", err));

//   ------------------------------------------------------------------
// Exercise 3: Chaining Promises
// Consider the following callback-based code that simulates fetching user
// data and then fetching additional details based on that user's ID:
// Your task is to convert the fetchUserData and fetchDetails functions into
// Promise-based versions and rewrite the usage code to use Promise chaining.
function fetchUserData(userId, callback) {
  setTimeout(() => {
    const userData = { id: userId, name: "John Doe" };
    callback(null, userData);
  }, 1000);
}

function fetchDetails(userId, callback) {
  setTimeout(() => {
    const details = { age: 30, email: "john@example.com" };
    callback(null, details);
  }, 1000);
}

// Usage
fetchUserData(123, (error, userData) => {
  if (error) {
    console.error("Error:", error);
  } else {
    fetchDetails(userData.id, (error, details) => {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("User Details:", { ...userData, ...details });
      }
    });
  }
});

function fetchUserDataPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userData = { id: userId, name: "John Doe" };
      if (Math.random() >= 0.7) resolve(userData);
      else reject(new Error("something's wrong"));
    }, 1000);
  });
}

function fetchDetailsPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const details = { age: 30, email: "john@example.com" };
      if (Math.random() >= 0.4) reject(new Error("no details, sorry"));
      else resolve(details);
    }, 1000);
  });
}

fetchUserDataPromise(123)
  .then((userData) => {
    //here i had to nest .then, because userData is unavailable in the second .then block
    //or i can make userData global variable... to avoid nesting
    fetchDetailsPromise(userData.id).then((details) =>
      console.log("User Details:", { ...userData, ...details })
    );
  })
  .catch((err) => console.error(err));
