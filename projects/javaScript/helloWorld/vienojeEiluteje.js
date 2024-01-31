function rnd() {
  return Math.round(Math.random() * 10);
}

let akumas = "";

for (let i = 0; i < 20; i++) {
  let atsitiktinisSuTarpu = rnd() + " "; //tam kad butu String tipo ir oer tarpa vienoje eiluteje
  akumas = akumas + atsitiktinisSuTarpu;
}

console.log(akumas);
