import { RangeSliderComponent } from "./RangerComponent/rangerComponent.js";

const maxXcanvas = 600;
const maxYcanvas = 600;
const canvas = document.getElementById("canvas");
canvas.width = maxXcanvas;
canvas.height = maxYcanvas;
const ctx = canvas.getContext("2d");

//(0,0) OF COORD AXIS
const midYcanvas = Math.round(maxYcanvas / 2);
const midXcanvas = Math.round(maxXcanvas / 2);

//lets see coordinate axis
plotAxis();

//here we enter function to plot
function fn(x) {
  return (
    0.01 * x ** 4 +
    0.05 * x ** 3 -
    0.002 * x ** 2 +
    1.3 * x +
    2 * Math.sin(x) -
    10
  );
}

// here we will have function which takes xmin,xmax as range of graph also function to apply
// it would plot graph on canvas so that xmin starts on the left and stretches to the right and height of graph can be adjusted?
plotFunction(fn, -7, 7, 0.2);

//I can reach slider's data by rc-data id
// document.addEventListener("DOMContentLoaded", () => {
//   let dta = document.getElementById("rc-data");
//   dta.addEventListener("change", (e) => {
//     console.log(e.target.innerText);
//     plotFunction(fn, -7, 7, (0.2 * Number(e.target.innerText)) / 100);
//   });
// });
document.addEventListener("rangeChange", () => {
  console.log("its here");
});
// let slider = new RangeSliderComponent();
//we'll add range sliders here to change range and zoom levels
function plotFunction(fn, fromX, toX, step) {
  let res = [];
  for (let x = fromX; x < toX; x += step) {
    res.push([x, fn(x)]);
  }
  plotArray(res);
}

function plotArray(arr) {
  let max = Math.max(...arr.flat().map((el) => Math.abs(el)));

  //now we can  normalize and maintain ratio
  let norm = arr.map(([x, y]) => {
    return [x / max, y / max];
  });

  //from -1 to 1
  let daugyklis = Math.min(canvas.width / 2, canvas.height / 2);

  ctx.beginPath();
  //   ctx.moveTo(x2c(xMin), y2c(0));
  norm.forEach(([x, y]) => {
    let xc = daugyklis * x;
    let yc = daugyklis * y;
    ctx.lineTo(x2c(xc), y2c(yc));
  });
  ctx.stroke();
  ctx.closePath();
}

//y coord to canvas coord
function y2c(y0) {
  return midYcanvas - y0;
}
function c2y(c0) {
  return c0 + midYcanvas;
}
//x coord to canvas coord
function x2c(x0) {
  return midXcanvas + x0;
}
function c2x(c0) {
  return midXcanvas - c0;
}
function plotAxis() {
  ctx.beginPath();
  ctx.moveTo(0, midYcanvas);
  ctx.lineTo(maxXcanvas, midYcanvas);

  ctx.moveTo(midXcanvas, 0);
  ctx.lineTo(midXcanvas, maxYcanvas);

  ctx.moveTo(x2c(0), y2c(0));
  ctx.fillText("(0,0)", x2c(2), y2c(-12));

  ctx.stroke();
  ctx.closePath();
}
