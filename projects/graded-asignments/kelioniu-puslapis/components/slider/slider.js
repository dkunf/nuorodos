//this script listens to left/right arrow click and slides pics by adding and removing classes.

// Model is our fifo stack for all img. Img have #id and this id are same as card data in our db
// we change stack, animate the change, then render it on screen - following mvc pattern
//styles are in slider.scss, html need to have div.slider with at least 3 img.reserve-pic inside

//because Nodelist has no shift and unshift methods
let reserveArray = Array.from(document.querySelectorAll(".reserve-pic"));
render(reserveArray);

let leftControl = document.getElementById("left-control");
leftControl.addEventListener("click", moveLeftHandler);
let rightControl = document.getElementById("right-control");
rightControl.addEventListener("click", moveRightHandler);

console.log(getObjData("dome"));

function render(arr) {
  //reset all classes in stack
  arr.forEach((element) => {
    element.classList = "reserve-pic";
  });

  //apply classes to last 2 img
  arr[arr.length - 1].classList = "";
  arr[arr.length - 1].classList.add("left-pic");

  arr[arr.length - 2].classList = "";
  arr[arr.length - 2].classList.add("right-pic");

  showProperCard(arr[arr.length - 1].id || "fallBack");
}

function animateLeftMove(arr) {
  arr[arr.length - 1].classList.add("make-left-move-from-0");

  arr[arr.length - 2].classList.add("make-left-move");

  arr[arr.length - 3].classList.add("make-appear");
}
function animateRightMove(arr) {
  arr[arr.length - 1].classList.add("move-right");

  arr[arr.length - 2].classList.add("make-right-move-from-right");

  arr[0].classList.add("make-appear");
}

function moveLeftHandler() {
  animateLeftMove(reserveArray);

  let last = reserveArray.pop();
  reserveArray.unshift(last);

  setTimeout(() => {
    render(reserveArray);
  }, 500);
}

function moveRightHandler() {
  animateRightMove(reserveArray);

  let first = reserveArray.shift();
  reserveArray.push(first);

  setTimeout(() => {
    render(reserveArray);
  }, 500);
}

function showProperCard(id) {
  let data = getObjData(id);
  document.getElementById("attraction-name").textContent = data.name;
  document.getElementById("attraction-place").textContent = data.location;
  document.getElementById("attraction-description").textContent =
    data.description;
}

function getObjData(id) {
  //here we add text for all our cards of places, kind of db :)
  placeData = {
    //placeData.id=value   ----------    this is same value as <img id="value"/>
    // fallBack is in case we cannot  find such id of image

    fallBack: {
      name: "Graži nežinoma vieta",
      location: "Kažkur Lietuvoje",
      description:
        "Kas žino šią vietą ir mums praneš el.paštu - gaus dovanėlių",
    },

    uzutrakio: {
      name: "Užutrakio dvaras",
      location: "TRAKAI",
      description:
        "Užutrakio dvaras - dvaras, stovintis prie Galvės ežero, Užutrakyje (Trakai). Kraštovaizdžio architektūros draustinis (nuo 1993 m.).",
    },

    kryzkalnis: {
      name: "Kryžių kalnas",
      location: "ŠIAULIAI",
      description:
        "Jurgaičių (Domantų) piliakalnis, dažniau vadinamas Kryžių kalnu - katalikų piligrimystės vieta Lietuvoje, Meškuičių seniūnijoje (Šiaulių rajonas), šalia Šiaulių-Rygos plento ir geležinkelio, 12 km į šiaurę nuo Šiaulių ir 6 km į pietvakarius nuo Meškuičių, Kulpės kairiajame krante. Katalikiškos piligrimystės vieta Šiaulių vyskupijoje. Ant piliakalnio yra tūkstančiai kryžių, atvežtų ne tik iš įvairių Lietuvos vietų, bet ir iš užsienio (todėl ir vadinasi Kryžių kalnu). Suskaičiuota, kad Kryžių kalne yra apie 200 tūkst. kryžių: 53 įrašyti į Kultūros vertybių registrą (2013 m.). Krikščionių pasaulyje šį kalną dar labiau išgarsino 1993 m. čia apsilankęs popiežius Jonas Paulius II.",
    },

    dome: {
      name: "Merkinės piramidė",
      location: "Česukai",
      description:
        "Merkinės piramidė - vienas lankomiausių Dzūkijos objektų, kuriame atvykstančių skaičius vis auga. Žinia apie ypatingas lankytojų patirtis bei čia vykstančius sveikatos stebuklus sklinda toli už Lietuvos ribų.",
    },

    //see how fallback wrks
    // gedimino:{
    //   name:
    //   location:
    //   description:
    // },
  };

  return placeData[id] || placeData.fallBack;
}
