// let MODE = "none";
let LAST_CLICKED_EL;
let LAST_CHOSEN_PROPERTY;
// controls how many pixels to add or subtract on one keypress
let STEP = 1;
let dashboardModel = {
  height: "",
  width: "",
  padding: "",
  margin: "",
  tagName: "",
  // parentTagName: "",
  display: "",
  parentDisplay: "",
};
// let CONSOLE = document.getElementById("console");
let DASHBOARD = document.getElementById("dashboard");
// updateDashboard();
// let RESIZER = document.getElementById("resizer-vertical");
// {} = f(#id,#id,#id,#id)
// let menuBtns = createMenu(
//   "height-adj--mode-btn",
//   "padding-adj-mode-btn",
//   "margin-adj-mode-btn",
//   "save-exit-btn"
// );
// el=f(#id)
let saveBtn = createSaveBtn("save-btn");
// saveBtn.classList.add("invisible");

document.addEventListener("click", clickHandler);
document.addEventListener("keydown", keyPressHandler);

function keyPressHandler(e) {
  const key = e.key || e.code;

  if (key == "5") {
    STEP = 5;
    return;
  }
  if (key == "1") {
    STEP = 1;
    return;
  }

  if (e.ctrlKey && key == "ArrowUp") {
    LAST_CHOSEN_PROPERTY = "paddingTop";
    e.preventDefault();
  }
  if (e.ctrlKey && key == "ArrowRight") {
    LAST_CHOSEN_PROPERTY = "paddingRight";
    e.preventDefault();
  }
  if (e.ctrlKey && key == "ArrowDown") {
    LAST_CHOSEN_PROPERTY = "paddingBottom";
    e.preventDefault();
  }
  if (e.ctrlKey && key == "ArrowLeft") {
    LAST_CHOSEN_PROPERTY = "paddingLeft";
    e.preventDefault();
  }

  if (e.shiftKey && key == "ArrowUp") {
    LAST_CHOSEN_PROPERTY = "marginTop";
    e.preventDefault();
  }
  if (e.shiftKey && key == "ArrowRight") {
    LAST_CHOSEN_PROPERTY = "marginRight";
    e.preventDefault();
  }
  if (e.shiftKey && key == "ArrowDown") {
    LAST_CHOSEN_PROPERTY = "marginBottom";
    e.preventDefault();
  }
  if (e.shiftKey && key == "ArrowLeft") {
    LAST_CHOSEN_PROPERTY = "marginLeft";
    e.preventDefault();
  }

  if (e.altKey && key == "ArrowUp") {
    LAST_CHOSEN_PROPERTY = "height";
    e.preventDefault();
  }
  if (e.altKey && key == "ArrowRight") {
    LAST_CHOSEN_PROPERTY = "width";
    e.preventDefault();
  }
  if (e.altKey && key == "ArrowDown") {
    LAST_CHOSEN_PROPERTY = "height";
    e.preventDefault();
  }
  if (e.altKey && key == "ArrowLeft") {
    LAST_CHOSEN_PROPERTY = "width";
    e.preventDefault();
  }

  updateDashboard();

  if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
    onArrowPress(key);
    e.preventDefault();
  }

  console.log(LAST_CHOSEN_PROPERTY);
  return;
}

function createSaveBtn(saveBtnId) {
  let saveBtn = document.createElement("button");
  document.body.appendChild(saveBtn);
  saveBtn.id = saveBtnId;
  saveBtn.textContent = "Save";
  return saveBtn;
}

function clickHandler(event) {
  if (LAST_CLICKED_EL) undoHighlightSelectedElement();
  LAST_CLICKED_EL = event.target;
  // updateDashboard();

  if (LAST_CLICKED_EL == saveBtn) {
    console.log("save and exit pressed");
    saveBtnClickHandler();
    return;
  }

  highlightSelectedElement();
  console.log(LAST_CLICKED_EL);
}

function onArrowPress(key) {
  // let key = e.key || e.code;

  //if any of those missing then return
  if (!(LAST_CLICKED_EL && LAST_CHOSEN_PROPERTY)) {
    console.log(
      "please make sure you choose element and property that you would like to change"
    );
    return;
  }
  // up or right is same, it increases size
  // down or left is same, it decreases size
  if (key == "ArrowDown") {
    changeOnePixelSize(LAST_CLICKED_EL, -1 * STEP, LAST_CHOSEN_PROPERTY);
  }
  if (key == "ArrowUp") {
    changeOnePixelSize(LAST_CLICKED_EL, 1 * STEP, LAST_CHOSEN_PROPERTY);
  }
  if (key == "ArrowLeft") {
    changeOnePixelSize(LAST_CLICKED_EL, -1 * STEP, LAST_CHOSEN_PROPERTY);
  }
  if (key == "ArrowRight") {
    changeOnePixelSize(LAST_CLICKED_EL, 1 * STEP, LAST_CHOSEN_PROPERTY);
  }
  updateDashboard();
  renderDashboard();
  return;
}

function renderDashboard() {
  console.log("would like to render dashboard");
  //first we need to interpret correctly padding and margin:

  let marginStringArray = dashboardModel.margin.split(" ");
  //if margin: 5px; then margin=[5,5,5,5]
  let mt = parseFloat(marginStringArray[0]);

  let tempStrVal = marginStringArray[2];
  if (tempStrVal) mb = parseFloat(tempStrVal);
  else mb = mt;
  //if margin: 3px 5px; then margin=[3,5,3,5]
  tempStrVal = marginStringArray[1];
  if (tempStrVal) mr = parseFloat(tempStrVal);
  else mr = mt;
  // if margin: 4px 6px 3px 77px;then margin=[4,6,3,77]
  tempStrVal = marginStringArray[3];
  if (tempStrVal) ml = parseFloat(tempStrVal);
  else ml = mr;
  // console.log("margin", mt, mr, mb, ml);

  document.getElementById("margin-top-px").textContent = mt + "px";
  document.getElementById("margin-right-px").textContent = mr + "px";
  document.getElementById("margin-bottom-px").textContent = mb + "px";
  document.getElementById("margin-left-px").textContent = ml + "px";

  //SAME FOR PADDING FOR NOW LATER DRY
  //first we need to interpret correctly padding and margin:

  let paddingStringArray = dashboardModel.padding.split(" ");
  //if padding: 5px; then padding=[5,5,5,5]
  let pt = parseFloat(paddingStringArray[0]);

  tempStrVal = paddingStringArray[2];
  if (tempStrVal) pb = parseFloat(tempStrVal);
  else pb = pt;
  //if padding: 3px 5px; then padding=[3,5,3,5]
  tempStrVal = paddingStringArray[1];
  if (tempStrVal) pr = parseFloat(tempStrVal);
  else pr = pt;
  // if padding: 4px 6px 3px 77px;then padding=[4,6,3,77]
  tempStrVal = paddingStringArray[3];
  if (tempStrVal) pl = parseFloat(tempStrVal);
  else pl = pr;
  // console.log("padding", pt, pr, pb, pl);

  document.getElementById("padding-top-px").textContent = pt + "px";
  document.getElementById("padding-right-px").textContent = pr + "px";
  document.getElementById("padding-bottom-px").textContent = pb + "px";
  document.getElementById("padding-left-px").textContent = pl + "px";

  // height,width left to do
  document.getElementById("height-px").textContent = dashboardModel.height;
  document.getElementById("width-px").textContent = dashboardModel.width;

  // now tagname, display of el
  document.getElementById("tagName").textContent = dashboardModel.tagName;
  document.getElementById("display-element").textContent =
    dashboardModel.display;

  // display and tag of parent
  // document.getElementById("parentTagName").textContent = dashboardModel.tagName;
  document.getElementById("display-parent").textContent =
    dashboardModel.parentDisplay;

  // highlight chosen property
  // if there is capital letter we split there
  let capitalLetter = LAST_CHOSEN_PROPERTY.match(/[A-Z]/);
  console.log(capitalLetter);
  let id;
  if (capitalLetter) id = LAST_CHOSEN_PROPERTY.split(capitalLetter)[0];
  else id = LAST_CHOSEN_PROPERTY;
  //FIST WE NEED TO DESELECT PREVIOUS ONE
  document.getElementById(id).classList.add("selected");
}

function changeOnePixelSize(elem, term, prop) {
  let valueString = window.getComputedStyle(elem)[prop];
  let valueNumber = parseFloat(valueString);
  valueNumber += term;
  valueString = valueNumber + "px";
  elem.style[prop] = valueString;
}

function highlightSelectedElement() {
  LAST_CLICKED_EL.classList.add("selected");
  LAST_CLICKED_EL.classList.add("all-borders");
}

function undoHighlightSelectedElement() {
  LAST_CLICKED_EL.classList.remove("selected");
  LAST_CLICKED_EL.classList.remove("all-borders");
}

function saveBtnClickHandler() {
  // document.removeEventListener("click", modeFn);
  // MODE = "none";
  saveBtn.classList.add("invisible");
  // Object.values(menuBtns).forEach((btn) => {
  //   btn.classList.remove("invisible");
  // });
  // document.removeEventListener("keydown", resizeOnArrowKeyHandler);
  // RESIZER.classList.add("invisible");
  // document.addEventListener("click", globalEventHandler);
}
// here we update our dashboard model object to later render it on screen if needed
function updateDashboard() {
  if (LAST_CLICKED_EL) {
    console.log(
      "udating dashboard...",
      getPropVal(LAST_CLICKED_EL, "display"),
      "parent has: ",
      getPropVal(LAST_CLICKED_EL.parentElement, "display")
    );
  }

  //here we need to go through all properties of element and update them
  Object.keys(dashboardModel).forEach((prop) => {
    dashboardModel[prop] = getPropVal(LAST_CLICKED_EL, prop);
  });

  dashboardModel.tagName = LAST_CLICKED_EL.tagName;
  dashboardModel.parentTagName = LAST_CLICKED_EL.parentElement.tagName;
  dashboardModel.parentDisplay = LAST_CLICKED_EL.parentElement.display;

  console.log(dashboardModel);
}

function getPropVal(el, prop) {
  if (el) {
    const elStyle = window.getComputedStyle(el);
    return elStyle.getPropertyValue(prop);
  } else return "no element";
}
// MAYBE FOR DELETION BELOW THIS POINT

// function createMenu(
//   heightAdjBtnId,
//   paddingAdjBtnID,
//   marginAdjBtnId,
//   exitBtnId
// ) {
//   let menuBtns = {};

//   menuBtns.height = document.createElement("button");
//   menuBtns.height.id = heightAdjBtnId;

//   menuBtns.padding = document.createElement("button");
//   menuBtns.padding.id = paddingAdjBtnID;

//   menuBtns.margin = document.createElement("button");
//   menuBtns.margin.id = marginAdjBtnId;

//   menuBtns.exit = document.createElement("button");
//   menuBtns.exit.id = exitBtnId;

//   Object.values(menuBtns).forEach((btn) => {
//     document.body.appendChild(btn);
//     btn.classList.add("menu-btn");
//     //for now
//     btn.textContent = `${btn.id}`;
//   });
//   console.log(menuBtns);
//   return menuBtns;
// }

// function globalEventHandler(event) {
//   LAST_CLICKED_EL = event.target;

//   console.log(menuBtns);

//   if (MODE !== "none") return;
//   if (!Object.values(menuBtns).includes(LAST_CLICKED_EL)) return;

//   if (LAST_CLICKED_EL == menuBtns.height) {
//     enterHeightAdjustmentMode();
//   }

//   // not sure how to visualize paddings yet...
//   // so lets just do without visualisation for now
//   // what if clone element, then set its paddings to 0 0 0 0
//   // and place it on top of orig el to see paddings?
//   // oh wait, computed styles knows padding values, i can do div of the size of el minus padding...
//   if (LAST_CLICKED_EL == menuBtns.padding) {
//     // enterPaddingAdjustmentMode();
//     console.log("padding adjustment clicked");
//   }
//   if (LAST_CLICKED_EL == menuBtns.margin) {
//     console.log("margin adjustment clicked");
//   }
//   if (LAST_CLICKED_EL == menuBtns.exit) {
//     console.log("exit clicked");
//   }
// }

// function enterPaddingAdjustmentMode() {
//   prepareForNewMode();
//   document.addEventListener("click", paddingAdjuster);

//   function paddingAdjuster(e) {
//     undoHighlightSelectedElement();
//     LAST_CLICKED_EL = e.target;

//     if (LAST_CLICKED_EL == saveBtn) {
//       saveBtnClickHandler(heightAdjuster);
//       return;
//     }
//     logClickedTagName();
//     highlightSelectedElement();
//     highlightPadding();
//   }
// }

// function highlightPadding() {
//   LAST_CLICKED_EL.classList.add("highlight-padding");
// }

// function enterHeightAdjustmentMode() {
//   prepareForNewMode();
//   document.addEventListener("click", heightAdjuster);

//   function heightAdjuster(e) {
//     undoHighlightSelectedElement();
//     LAST_CLICKED_EL = e.target;

//     if (LAST_CLICKED_EL == saveBtn) {
//       saveBtnClickHandler(heightAdjuster);
//       return;
//     }
//     logClickedTagName();
//     highlightSelectedElement();
//     addTriangles("bottom");
//     document.addEventListener("keydown", onArrowPress);
//   }
// }
// i am thinking to change it to handler which ctrl+arrow adjusts padding and Alt+arrow adjusts margins and arrow adjusts size
// function resizeOnArrowKeyHandler(e) {
//   let key = e.key;
//   if (key == "ArrowDown") {
//     changeOnePixelSize(LAST_CLICKED_EL, 1, "height");
//   }
//   if (key == "ArrowUp") {
//     changeOnePixelSize(LAST_CLICKED_EL, -1, "height");
//   }
//   if (key == "ArrowLeft") {
//     changeOnePixelSize(LAST_CLICKED_EL, -1, "width");
//   }
//   if (key == "ArrowRight") {
//     changeOnePixelSize(LAST_CLICKED_EL, 1, "width");
//   }
//   return;
// }
// trying to modify resizeOnArrowKeyHandler for also padding and margin
// problem that padding has 4values with 2 options: decrease or increase, so its 8 ifs or switch.
// and how to select conveniently? ctrl+up/down then select border (highlights)ctrl+left/right then ctrl+up/down to resize
// and for margins same but with alt instead of ctrl... sounds like idea

// term is 1 or-1 to change 1px or 5 and -5
// prop can be 'height','width','paddingLeft',
// 'paddingRight','paddingTop','paddingBottom',
// 'marginLeft', 'marginRight','marginTop','marginBottom'

// side = bottom / top / left / right / all
//for now just bottom
// function addTriangles(side) {
//   LAST_CLICKED_EL.classList.add("triangles");
//   RESIZER.classList.remove("invisible");
//   LAST_CLICKED_EL.appendChild(RESIZER);
// }

// function logClickedTagName() {
//   CONSOLE.textContent = LAST_CLICKED_EL.tagName;
//   CONSOLE.classList.toggle("log-chosen-el");
//   setTimeout(() => {
//     CONSOLE.classList.toggle("log-chosen-el");
//   }, 1000);
// }

// function prepareForNewMode() {
//   document.removeEventListener("click", globalEventHandler);
//   Object.values(menuBtns).forEach((btn) => {
//     btn.classList.add("invisible");
//   });
//   saveBtn.classList.remove("invisible");
// }
