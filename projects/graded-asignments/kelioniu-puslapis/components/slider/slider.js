// this is our fifo stack for all img.
// we change stack, animate the change, then render it on screen
//styles are in slider.scss, html need to have div.slider with at least 3 img.reserve-pic inside

//because Nodelist has no shift and unshift methods
let reserveArray = Array.from(document.querySelectorAll(".reserve-pic"));
render(reserveArray);

let leftControl = document.getElementById("left-control");
leftControl.addEventListener("click", moveLeftHandler);
let rightControl = document.getElementById("right-control");
rightControl.addEventListener("click", moveRightHandler);

function render(arr) {
  //reset all classes in stack
  arr.forEach((element) => {
    element.classList = "reserve-pic";
  });

  //apply classes to last 3 img (why not first 3, idiot?)
  arr[arr.length - 1].classList = "";
  arr[arr.length - 1].classList.add("left-pic");

  arr[arr.length - 2].classList = "";
  arr[arr.length - 2].classList.add("right-pic");
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

  //actually it's not same as going left, but it's ok
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
