document.addEventListener("click", removeModal);
document.addEventListener("keyup", validatePositive);
document.querySelector("button").addEventListener("click", () => {
  let results = document.querySelector(".results");
  countOrder();
  results.scrollIntoView({ behavior: "smooth" });
});
document.querySelector(".reset-btn").addEventListener("click", resetOrder);

function resetOrder() {
  let inputs = document.querySelectorAll("input");

  inputs.forEach((el) => {
    el.value = "";
    el.classList.remove("red");
  });
  let results = document.querySelector(".results");
  results.textContent = "0";
}

function validatePositive(evt) {
  let kaltininkas = evt.target;
  let val = kaltininkas.value;

  if (!/\d+/.test(val) && kaltininkas.tagName === "INPUT") {
    console.log("very bad");
    kaltininkas.classList.add("red");

    openModal(kaltininkas);
  } else {
    kaltininkas.classList.remove("red");
    removeModal();
    countOrder();
  }
  console.log(kaltininkas);
  console.log(val);
}

function countOrder() {
  let inputs = document.querySelectorAll("input");
  let inputValues = [];
  //becomes 0 if not a number
  inputs.forEach((el, ind) => {
    inputValues.push(Number(el.value) || 0);
    if (inputValues[ind] === 0) {
      el.value = "";
      el.classList.remove("red");
    }
  });

  console.log(inputValues);
  let total = inputValues.reduce((acu, el) => acu + el, 0);

  let results = document.querySelector(".results");
  results.textContent = total;
}

function openModal(el) {
  if (el.tagName !== "INPUT") return;
  let inputSizes = el.getBoundingClientRect();

  const errContainer = document.querySelector(".errContainer");
  errContainer.style.display = "block";

  //how much higher and wider errContainer should be
  let errHeight = inputSizes.height + 200;
  let errWidth = inputSizes.width + 50;

  //to center the hole
  let adjustX = 20;
  let adjustY = 5;

  //if it was scrolled
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  errContainer.style.height = errHeight + "px";
  errContainer.style.width = errWidth + "px";

  errContainer.style.left = inputSizes.x - errWidth / 2 + adjustX + "px";
  errContainer.style.top =
    inputSizes.y - errHeight / 2 + adjustY + scrollTop + "px";

  let results = document.querySelector(".results");
  results.textContent = "?";

  console.log(
    "canvas.getBoundingClientRect().x: ",
    errContainer.getBoundingClientRect().x
  );
  console.log(
    "canvas.getBoundingClientRect().y: ",
    errContainer.getBoundingClientRect().y
  );
}

function removeModal() {
  const errContainer = document.querySelector(".errContainer");
  errContainer.style.display = "none";
}
