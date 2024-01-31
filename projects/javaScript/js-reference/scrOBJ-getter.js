let l = console.log;

// i want to have property which would be evaluated during access time
// that's job for the getter method!

// const objectWithGetter = {
//     get propertyName() {
//       // Calculate and return the value dynamically
//       return /* some calculation based on current state */;
//     }
//   };

const currentTimestamp = Date.now();
const currentDate = new Date(currentTimestamp);
const hours = currentDate.getHours();

let open = hours < 22 && hours > 7 ? "atidaryta" : "uždaryta";
let nuo = 8;
let iki = 21;

let parduotuve = {
  pavadinimas: "pigu",

  dirba: {
    nuo: nuo,
    iki: iki,
  },
  get status() {
    const currentTimestamp = Date.now();
    const currentDate = new Date(currentTimestamp);
    const hours = currentDate.getHours();
    return hours < this.dirba.iki && hours >= this.dirba.nuo
      ? "atidaryta"
      : "uždaryta";
  },
};
let parduotuve2 = {
  pavadinimas: "pigu",

  dirba: {
    nuo: 9,
    iki: 23,
  },
  status: hours < 22 && hours > 7 ? "atidaryta" : "uždaryta",
};

l(parduotuve.status);

class Parduotuve {
  pavadinimas = "pigu";
  dirba = {};

  constructor(pavad = "pigu", nuo = 7, iki = 20) {
    this.pavadinimas = pavad;
    this.dirba.nuo = nuo;
    this.dirba.iki = iki;
    this.status = hours < iki && hours > nuo ? "atidaryta" : "uždaryta";
  }
}

let parduotuve1 = new Parduotuve();
l(parduotuve1);

let parduotuve3 = new Parduotuve("lemona", 10, 18);
l("3pard: ", parduotuve3);
