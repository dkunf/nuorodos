const readline = require("readline");
let userInput;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function ivestiReiksmes() {
  let prompt = "Enter a: ";
  let neededVal = await askForVal();
  if (neededVal) console.log("neededVal ", neededVal);

  prompt = "Enter b: ";
  neededVal = await askForVal();
  if (neededVal) console.log("neededVal ", neededVal);
  prompt = "Enter c: ";
  neededVal = await askForVal();
  if (neededVal) console.log("neededVal ", neededVal);
  prompt = "Enter d: ";
  neededVal = await askForVal();
  if (neededVal) console.log("neededVal ", neededVal);

  async function askForVal() {
    do {
      userInput = await getUserInput(prompt);
      let nr = Number(userInput) || null;
      if (!nr) console.log("try again");
      else return userInput;
    } while (userInput);
  }

  rl.close();
}

ivestiReiksmes().catch((error) => console.error(error));
