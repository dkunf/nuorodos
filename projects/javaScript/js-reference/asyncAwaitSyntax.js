// Exercise 1: Convert a Promise to Async/Await
// Convert the following Promise-based function to use async/await:

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = "Hello, this is your data!";
      resolve(data);
    }, 1000);
  });
}

// Usage
fetchData()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

async function fetchDataAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = "Hello, this is your data!";
      resolve(data);
    }, 1000);
  });
}

(async () => {
  try {
    let data = await fetchDataAsync();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
})();

// ---------------------------------------------------------------
// Exercise 2: Error Handling with Async/Await

// Convert the following Promise-based function to use async/await. Add proper error handling to handle rejections:

function fetchDataWithError() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = new Error("Something went wrong!");
      reject(error);
    }, 1000);
  });
}

// Usage
fetchDataWithError()
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));

async function fetchDataWithError2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = new Error("Something went wrong!");
      reject(error);
    }, 1000);
  });
}

(async () => {
  try {
    const data = await fetchDataWithError2();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
})();
// -------------------------------------------------------------------

// Exercise 3: Chaining Async/Await
// Convert the following nested Promise-based code to use async/await with proper chaining:

fetchUserDataPromise(123)
  .then((userData) => {
    return fetchDetailsPromise(userData.id).then((details) => {
      console.log("User Details:", { ...userData, ...details });
    });
  })
  .catch((error) => console.error(error));

(async () => {
  const userData = await fetchUserDataPromise(123);
  const details = await fetchDetailsPromise(userData.id);
  console.log("User Details:", { ...userData, ...details });
})();

// -----------------------------------------------------------
// Exercise 4: Parallel Async/Await
// Write an async function that fetches data from two different sources simultaneously and logs the combined result.
// Use Promise.all to execute the async operations in parallel.

async function fetchDataFromSources() {
  try {
    const [data1, data2] = await Promise.all([
      fetchDataFromSource1(),
      fetchDataFromSource2(),
    ]);

    console.log("Combined Data:", { data1, data2 });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchDataFromSource1() {
  // Simulate fetching data from source 1
  return new Promise((resolve) =>
    setTimeout(() => resolve("Data from source 1"), 1000)
  );
}

async function fetchDataFromSource2() {
  // Simulate fetching data from source 2
  return new Promise((resolve) =>
    setTimeout(() => resolve("Data from source 2"), 1500)
  );
}

// Usage
fetchDataFromSources();
