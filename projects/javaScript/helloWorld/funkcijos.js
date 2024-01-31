function veiksmas(a, b, fn) {
  return fn(a, b);
}
function suma(x, y) {
  console.log("suma");
  return x + y;
}
function skirtumas(x, y) {
  console.log("skirtumas");
  return x - y;
}
function daugyba(x, y) {
  console.log("daugyba");
  return x * y;
}
function dalyba(x, y) {
  console.log("dalyba");
  return y === 0 ? Infinity : x / y;
}
console["log"](veiksmas(3, 5, suma));

//...fnArr takes any number of functions and turns it to array of functions
let daugVeiksmo = function (a, b, ...fnArr) {
  let resultArray = fnArr.map((fn) => {
    return {
      func: fn.name, //.toString().replace(/^function (\w+)\(.+/ms, "$1"), //ms flag means multiline string
      result: fn(a, b),
    };
  });
  return [{ a: a, b: b }].concat(resultArray);
};
console.table(daugVeiksmo(4, 0, suma, skirtumas, dalyba, daugyba, suma));
