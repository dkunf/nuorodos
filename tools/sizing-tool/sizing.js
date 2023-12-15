let MODE = "none";
let LAST_CLICKED_EL;
let CONSOLE = document.getElementById("console");
let RESIZER = document.getElementById("resizer-vertical");
// {} = f(#id,#id,#id,#id)
let menuBtns = createMenu(
  "height-adj--mode-btn",
  "padding-adj-mode-btn",
  "margin-adj-mode-btn",
  "save-exit-btn"
);
// el=f(#id)
let saveBtn = createSaveBtn("save-btn");
saveBtn.classList.add("invisible");

document.addEventListener("click", globalEventHandler);

function createSaveBtn(saveBtnId) {
  let saveBtn = document.createElement("button");
  document.body.appendChild(saveBtn);
  saveBtn.id = saveBtnId;
  saveBtn.textContent = "Save";
  return saveBtn;
}

function createMenu(
  heightAdjBtnId,
  paddingAdjBtnID,
  marginAdjBtnId,
  exitBtnId
) {
  let menuBtns = {};

  menuBtns.height = document.createElement("button");
  menuBtns.height.id = heightAdjBtnId;

  menuBtns.padding = document.createElement("button");
  menuBtns.padding.id = paddingAdjBtnID;

  menuBtns.margin = document.createElement("button");
  menuBtns.margin.id = marginAdjBtnId;

  menuBtns.exit = document.createElement("button");
  menuBtns.exit.id = exitBtnId;

  Object.values(menuBtns).forEach((btn) => {
    document.body.appendChild(btn);
    btn.classList.add("menu-btn");
    //for now
    btn.textContent = `${btn.id}`;
  });
  console.log(menuBtns);
  return menuBtns;
}

function globalEventHandler(event) {
  LAST_CLICKED_EL = event.target;

  console.log(menuBtns);

  if (MODE !== "none") return;
  if (!Object.values(menuBtns).includes(LAST_CLICKED_EL)) return;

  if (LAST_CLICKED_EL == menuBtns.height) {
    enterHeightAdjustmentMode();
  }

  // not sure how to visualize paddings yet...
  // so lets just do without visualisation for now
  // what if clone element, then set its paddings to 0 0 0 0
  // and place it on top of orig el to see paddings?
  // oh wait, computed styles knows padding values, i can do div of the size of el minus padding...
  if (LAST_CLICKED_EL == menuBtns.padding) {
    // enterPaddingAdjustmentMode();
    console.log("padding adjustment clicked");
  }
  if (LAST_CLICKED_EL == menuBtns.margin) {
    console.log("margin adjustment clicked");
  }
  if (LAST_CLICKED_EL == menuBtns.exit) {
    console.log("exit clicked");
  }
}

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

function enterHeightAdjustmentMode() {
  prepareForNewMode();
  document.addEventListener("click", heightAdjuster);

  function heightAdjuster(e) {
    undoHighlightSelectedElement();
    LAST_CLICKED_EL = e.target;

    if (LAST_CLICKED_EL == saveBtn) {
      saveBtnClickHandler(heightAdjuster);
      return;
    }
    logClickedTagName();
    highlightSelectedElement();
    addTriangles("bottom");
    document.addEventListener("keydown", resizeOnArrowKeyHandlerModification);
  }
}
// i am thinking to change it to handler which ctrl+arrow adjusts padding and Alt+arrow adjusts margins and arrow adjusts size
function resizeOnArrowKeyHandler(e) {
  let key = e.key;
  if (key == "ArrowDown") {
    changeOnePixelSize(LAST_CLICKED_EL, 1, "height");
  }
  if (key == "ArrowUp") {
    changeOnePixelSize(LAST_CLICKED_EL, -1, "height");
  }
  if (key == "ArrowLeft") {
    changeOnePixelSize(LAST_CLICKED_EL, -1, "width");
  }
  if (key == "ArrowRight") {
    changeOnePixelSize(LAST_CLICKED_EL, 1, "width");
  }
  return;
}
// trying to modify resizeOnArrowKeyHandler for also padding and margin
// problem that padding has 4values with 2 options: decrease or increase, so its 8 ifs or switch.
// and how to select conveniently? ctrl+up/down then select border (highlights)ctrl+left/right then ctrl+up/down to resize
// and for margins same but with alt instead of ctrl... sounds like idea
function resizeOnArrowKeyHandlerModification(e) {
  let key = e.key;
  if (e.ctrlKey && (e.key === "ArrowUp" || e.code === "ArrowUp")) {
    // can be: "10px" or "0px 0px 5px 10px"  depending on what was set
    let currentPaddingString = window.getComputedStyle(LAST_CLICKED_EL).padding;
    console.log(currentPaddingString);
  }
  if (e.ctrlKey && (e.key === "ArrowDown" || e.code === "ArrowDown")) {
    console.log("ctrl+down");
  }
  if (e.ctrlKey && (e.key === "ArrowLeft" || e.code === "ArrowLeft")) {
    console.log("ctrl+left");
  }
  if (e.ctrlKey && (e.key === "ArrowRight" || e.code === "ArrowRight")) {
    console.log("ctrl+right");
  }

  if (key == "ArrowDown") {
    changeOnePixelSize(LAST_CLICKED_EL, 1, "height");
  }
  if (key == "ArrowUp") {
    changeOnePixelSize(LAST_CLICKED_EL, -1, "height");
  }
  if (key == "ArrowLeft") {
    changeOnePixelSize(LAST_CLICKED_EL, -1, "width");
  }
  if (key == "ArrowRight") {
    changeOnePixelSize(LAST_CLICKED_EL, 1, "width");
  }
  return;
}

// direction is 'width' or 'height'
function changeOnePixelSize(el, term, direction) {
  let currentHeightString = window.getComputedStyle(el)[direction];
  let currentHeightNumber = parseFloat(currentHeightString);
  currentHeightNumber += term;
  currentHeightString = currentHeightNumber + "px";
  el.style[direction] = currentHeightString;
}

function subtractOnePixelHeight(el) {}

// side = bottom / top / left / right / all
//for now just bottom
function addTriangles(side) {
  LAST_CLICKED_EL.classList.add("triangles");
  RESIZER.classList.remove("invisible");
  LAST_CLICKED_EL.appendChild(RESIZER);
}

function highlightSelectedElement() {
  LAST_CLICKED_EL.classList.add("selected");
  LAST_CLICKED_EL.classList.add("all-borders");
}

function undoHighlightSelectedElement() {
  LAST_CLICKED_EL.classList.remove("selected");
  LAST_CLICKED_EL.classList.remove("all-borders");
}

function logClickedTagName() {
  CONSOLE.textContent = LAST_CLICKED_EL.tagName;
  CONSOLE.classList.toggle("log-chosen-el");
  setTimeout(() => {
    CONSOLE.classList.toggle("log-chosen-el");
  }, 1000);
}

function prepareForNewMode() {
  document.removeEventListener("click", globalEventHandler);
  Object.values(menuBtns).forEach((btn) => {
    btn.classList.add("invisible");
  });
  saveBtn.classList.remove("invisible");
}
function saveBtnClickHandler(modeFn) {
  document.removeEventListener("click", modeFn);
  MODE = "none";
  saveBtn.classList.add("invisible");
  Object.values(menuBtns).forEach((btn) => {
    btn.classList.remove("invisible");
  });
  document.removeEventListener("keydown", resizeOnArrowKeyHandler);
  RESIZER.classList.add("invisible");
  document.addEventListener("click", globalEventHandler);
}
