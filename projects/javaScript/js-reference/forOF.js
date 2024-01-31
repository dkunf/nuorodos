// Susikurkite masyvą failų pavadinimams saugoti, užpildykite jį
// duomenimis. Jums reikės nuskaityti šiuos failus, todėl pirma norėsite
// patikrinti su kuriais galite dirbti. Išveskite į ekraną tik tuos failus, kurių
// galūnė yra .txt arba .json tipo.   ---->> pakeiciau salyga i .json arba .js tipo
const fs = require("fs");
const path = require("path");

let failuVardai = [];
let tekstas = [];

//paimsime failus iš einamo folderio ir ikišime į []
const directoryPath = __dirname;

try {
  failuVardai = fs.readdirSync(directoryPath);
} catch (err) {
  console.log("ooops");
  console.log(err);
}
console.log("štai mūsų failai direktorijoje ", directoryPath);
console.log(failuVardai);

//na o dabar jos skaitysime :)
//bus proga panaudoti for of, bet ne geriau tiks for in, nes reiks dar tuo pačiu indeksu įkišti į kitą arr tekstą
//for..in i indexus ziuri kaip i stringus, atsargiai. Taip pat Symbol jis praleidzia.
for (indeksas in failuVardai) {
  try {
    let kelias = path.join(__dirname, failuVardai[indeksas]);
    const stats = fs.statSync(kelias);
    if (
      stats.isFile() &&
      (kelias.endsWith(".json") || kelias.endsWith(".js"))
    ) {
      tekstas[indeksas] = fs.readFileSync(kelias, "utf8");
    } else {
      tekstas[indeksas] = "tai netinkamas mums failas arba papke";
    }
    console.log("failas: ", kelias);
    console.log("jo turinys: \n", tekstas[indeksas]);
    console.log(
      "///////////////////////////////////////////////////////////////////////////////////////////"
    );
    console.log(
      "///////////////////////////////////////////////////////////////////////////////////////////"
    );
    console.log(
      "///////////////////////////////////////////////////////////////////////////////////////////"
    );
    console.log(
      "///////////////////////////////////////////////////////////////////////////////////////////"
    );
  } catch (err) {
    console.log(err);
  }
}
//na dabar jau ir for of panaudosime
