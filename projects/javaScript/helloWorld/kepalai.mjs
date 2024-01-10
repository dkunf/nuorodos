//chalk  neleidzia "require", teko pervadinti .js i .mjs  ir naudoti "import"
//dar dėl to teko naudoti import readline, o šiaip jam ir require tiktų
//leidzia ivesti duomenis per console ir t.t.
import readline from "readline";
//nuspalvina console
import chalk from "chalk";

const darboVal = 8;

let kepPerVal = 10;
let darbuotojuSkaicius = 12;
let savikaina = 0.6;
let pardKaina = 2.3;
let uzsakymuSkaicius = 1000;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

sprendimas(
  kepPerVal,
  darbuotojuSkaicius,
  savikaina,
  pardKaina,
  uzsakymuSkaicius
);

//uzkniso rasyti console.log() :), sutrumpinau iki l()
function l(msg, color = "white") {
  console.log("---------------------------------");
  console.log(chalk[color](msg));
  console.log("---------------------------------");
}

//reikia async, tada galima await pagalba normaliai dirbti su promptu
//arba bus recursion ir daug nesting, man nepavyko su callback
async function sprendimas(
  kepPerVal,
  darbuotojuSkaicius,
  savikaina,
  pardKaina,
  uzsakymuSkaicius
) {
  //--------------------------------------------------------------
  //skaičiavimai
  let visoKepaluPerDiena = darboVal * kepPerVal * darbuotojuSkaicius;
  let visoSavikaina =
    visoKepaluPerDiena < uzsakymuSkaicius
      ? visoKepaluPerDiena * savikaina
      : uzsakymuSkaicius * savikaina;
  visoSavikaina = Math.round(visoSavikaina * 100) / 100;
  let pajamos =
    uzsakymuSkaicius < visoKepaluPerDiena
      ? uzsakymuSkaicius * pardKaina
      : visoKepaluPerDiena * pardKaina;
  pajamos = Math.round(pajamos * 100) / 100;
  let pelnas = pajamos - visoSavikaina;
  //--------------------------------------------------------------
  //rezultatų išvedimas į konsolę
  l(`
    Turime tokią uzduotį:
    1. Suskaičiuoti kiek kepykla per vieną darbo dieną spės iškepti duonos
    kepalų.
    2. Apskaičiuoti visų kepalų savikainą, gautas pajamas pardavus ir iš to gauto
    pelno dalį.
    3. Patikrinti ar kepykla spės iškepti visus tos dienos užsakymus. Jei ne,
    suskaičiuoti kiek kepalų nespės iškepti.
    4. (Papildomai) Įvertinkite tai, kad pajamas ir pelną galite gauti tik iš
    parduotų kepalų.
    
    Turime tokius duomenis:
     darboVal =             ${darboVal} val;
     kepPerVal =            ${kepPerVal} vnt;
     darbuotojuSkaicius =   ${darbuotojuSkaicius} žm;
     savikaina =            ${savikaina} eur;
     pardKaina =            ${pardKaina} eur;
     uzsakymuSkaicius =     ${uzsakymuSkaicius} vnt;
     visoKepaluPerDiena =   ${visoKepaluPerDiena} vnt [darboVal * kepPerVal * darbuotojuSkaicius];
     visoSavikaina =        ${visoSavikaina} eur [visoKepaluPerDiena * savikaina arba uzsakymuSkaicius * savikaina;];
     pajamos =              ${pajamos} eur [visoKepaluPerDiena * pardKaina arba uzsakymuSkaicius * pardKaina];
     pelnas =               ${pelnas} eur [pajamos - visoSavikaina];
    `);
  if (uzsakymuSkaicius > visoKepaluPerDiena) {
    console.log(
      chalk.red(
        "nespėjame kepti, dar trūksta ",
        uzsakymuSkaicius - visoKepaluPerDiena,
        " kepalų"
      )
    );
  } else {
    l("spėjame pagaminti ", "green");
  }
  //----------------------------------------------------------
  //Gal norėtų iš naujo įvęsti duomenis ir paskaičiuoti?
  let validData = false; //vėliava,kad galima būtų pakartoti įvedima kai netinkami duomenys
  while (!validData) {
    let prompt = "Gal nori pakeisti pradinius duomenis? (t/N) ";
    let arTesti = await getUserInput(prompt);

    console.log("įvedei: " + arTesti);
    switch (arTesti.toLowerCase()) {
      case "t":
        l("t");
        //ten galima įvesti visus duomenis
        await ivestiReiksmes().catch((error) => console.error(error));
        validData = true;
        break;
      case "n":
        l("n");
        l("ačiū, viso gero, good luck :)", "grey");
        rl.close();
        validData = true;
        break;
      default:
        l(
          `
      Prie ko čia "${arTesti}" ? 
      spausk     "t"   arba   "n" ? `,
          "red"
        );
        validData = false;
    }
  }
}

//keičiam callback fn į Promise, kad galima būtų naudoti async-await ir dirbti kaip su sync.Kitaip man neišėjo
async function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

//duomenų įvedimas, kad būtų papraščiau keičiam async į sync per await ir keičiant callback į Promise
async function ivestiReiksmes() {
  let prompt = "kepPerVal= ";
  kepPerVal = await askForVal();

  prompt = "darbuotojuSkaicius= ";
  darbuotojuSkaicius = await askForVal();
  if (darbuotojuSkaicius) prompt = "savikaina= ";
  savikaina = await askForVal();

  prompt = "pardKaina= ";
  pardKaina = await askForVal();

  prompt = "uzsakymuSkaicius= ";
  uzsakymuSkaicius = await askForVal();

  sprendimas(
    kepPerVal,
    darbuotojuSkaicius,
    savikaina,
    pardKaina,
    uzsakymuSkaicius
  );
  async function askForVal() {
    let userInput;
    do {
      userInput = await getUserInput(prompt);
      let nr = Number(userInput) || null;
      if (!nr)
        l(
          "bandyk dar kartą, iš tavęs reikalingas  skaičius o ne nesamonė kurią parašiai",
          "yellow"
        );
      else return userInput;
    } while (userInput);
  }
}

//Galima dar padaryti:
//1. pereiti nuo paprastų kintamųjų prie objekto, kad būtų paprasčiau iteruoti
//2. idomumo dėlei padaryti iš to skaičiuoklę pvz kaip optimizuoti pelną turint kažkokius duomenis ir keičiant kitus :)
