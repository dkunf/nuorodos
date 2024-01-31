// sukuriam parduotuves objekta
let parduotuve = {
  pavadinimas: "maxima",
  dirbaNuo: 8,
  dirbaIki: 22,

  //getter methodas yra standartinis metodas, kuris taikomas kai reikia dinamisku property
  get status() {
    return dabarValandu >= this.dirbaNuo && dabarValandu < this.dirbaIki
      ? "atidaryta"
      : "uzdaryta";
  },
};

// cia keisime kiek dabar valandu kad galima butu paziureti ar veikia
let dabarValandu;

for (i = 0; i < 24; i++) {
  dabarValandu = i;
  //i get metoda kreipiamasi be skliaustu, kaip i paprasta property:
  //  parduotuve.status, o ne parduotuve.status()
  //    nors tai yra funkcija, bet ji yra specialiai padaryta tokiems atvejams
  console.log(
    `dabar yra ${dabarValandu}, parduotuve ${parduotuve.pavadinimas.toLocaleUpperCase()} yra ${
      parduotuve.status
    }`
  );
}

//galima dar padaryti kad parduotuve pati zinotu kiek valandu dabar ir pati sakytu
let parduotuve2 = {
  pavadinimas: "lidl",
  dirbaNuo: 8,
  dirbaIki: 20,

  get dabarVal() {
    let siandien = new Date();
    return parseInt(siandien.getHours());
  },
  //getter methodas yra standartinis metodas, kuris taikomas kai reikia dinamisku property
  get status() {
    return dabarValandu >= this.dirbaNuo && this.dabarVal < this.dabarVal
      ? "atidaryta"
      : "uzdaryta";
  },
};

console.log("============================================");
console.log(`parduotuve2 ${parduotuve2.status},
 nes dabar yra ${parduotuve2.dabarVal} valandu,
 o parduotuves darbo laikas yra nuo ${parduotuve2.dirbaNuo} iki ${
  parduotuve2.dirbaIki
}.
 Su pagarba, jusu ${parduotuve2.pavadinimas.toLocaleUpperCase()},
 Taip gyventi verta!
 `);
