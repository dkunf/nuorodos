// išvedam pirminius skaičius nuo 'nuo' iki 'iki' į console
//pirminis skaičius dalijasi tik iš 1 ir savęs
const nuo = 11604;
const iki = 11654;

let sk = nuo;
let yraPirminis;

while (sk <= iki) {
  do {
    sk++;
    //jeigu nepasikeis į false po šito ciklo tai reiškia tikrai pirminis :)
    yraPirminis = true;
    for (let j = 2; j <= sk; j++) {
      //dalijam iš visų iš eilės skaičių ir bandom surasti bent vieną iš kuriuo dalijasi
      if (sk % j === 0 && sk !== j) {
        yraPirminis = false;
        break;
      }
    }
  } while (!yraPirminis);

  console.log(sk);
}
