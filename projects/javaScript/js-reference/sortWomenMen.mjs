let vardai = [
  "Pavelas",
  "Reda",
  "Paulius",
  "Laurynas",
  "Žilvinas",
  "Olesia",
  "Evaldas",
  "Edgaras",
  "Rita",
  "Ugnius",
  "Arnoldas",
  "Veronika",
  "Darjus",
];
function womenFirstCondition(vardas1, vardas2) {
  //kai pirmas vyras, o antra moteris: sukeisk vietom (1)
  if (vardas1.endsWith("s") && !vardas2.endsWith("s")) return 1;
  //kai pirma moteris, o antras vyras taip palik (-1)
  else if (!vardas1.endsWith("s") && vardas2.endsWith("s")) return -1;
  //kitais atvejais mums nesvarbu (0)
  else return 0;
}

let prefixedvardai = vardai
  .sort((v1, v2) => womenFirstCondition(v1, v2))
  .map((vardas) =>
    vardas.endsWith("s") ? `Gentleman ${vardas}` : `Lady ${vardas}`
  );

console.log(prefixedvardai, vardai);

//kitame faile turime masyva su 404 vardais
import { ohoKiekVardu } from "./varduMasyvas.mjs";

ohoKiekVardu.sort((a, b) => womenFirstCondition(a, b));
console.log(...ohoKiekVardu);
console.log(ohoKiekVardu.length);

function fragmentoPaieska(frag) {
  //pvz man reikia vardu kuriuose yra 'mant'
  let vardaiSuFrag = ohoKiekVardu.filter((vardas) => {
    return removeDiacritics(vardas).toLowerCase().includes(frag);
  });
  console.log(
    `
    Sie vardai turi "${frag}" savyje:
    `,
    vardaiSuFrag,
    `
   tokiu yra, ${vardaiSuFrag.length}`
  );
}

fragmentoPaieska("mant");
fragmentoPaieska("taut");
fragmentoPaieska("taur");
fragmentoPaieska("vyt");
fragmentoPaieska("ist");
fragmentoPaieska("ina");
fragmentoPaieska("ima");
fragmentoPaieska("int");
fragmentoPaieska("tar");

//funkcija fragmentoPaieska(frag) nepaimtu vardu, kuriuose pasitaiko kirciavimas butent fragmente kuri paduodam
//chatGPT:
// In this JavaScript function:
//  normalize("NFD") decomposes the Unicode string into the base characters and diacritics.
//  replace(/[\u0300-\u036f]/g, "") uses a regular expression to remove all characters
//  in the Unicode range for combining diacritical marks.
function removeDiacritics(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
