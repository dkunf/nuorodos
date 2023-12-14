let MODE = "none";
let LAST_CLICKED_EL;

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
    console.log("height adjustment clicked");
    enterHeightAdjustmentMode();
  }

  if (LAST_CLICKED_EL == menuBtns.padding) {
    console.log("padding adjustment clicked");
  }
  if (LAST_CLICKED_EL == menuBtns.margin) {
    console.log("margin adjustment clicked");
  }
  if (LAST_CLICKED_EL == menuBtns.exit) {
    console.log("exit clicked");
  }
}

function enterHeightAdjustmentMode() {
  prepareForNewMode();
  document.addEventListener("click", heightAdjuster);

  function heightAdjuster(e) {
    LAST_CLICKED_EL.classList.remove("selected");
    LAST_CLICKED_EL = e.target;
    LAST_CLICKED_EL.classList.add("selected");
    console.log(LAST_CLICKED_EL);
  }
}

function prepareForNewMode() {
  document.removeEventListener("click", globalEventHandler);
  Object.values(menuBtns).forEach((btn) => {
    btn.classList.add("invisible");
  });
  saveBtn.classList.remove("invisible");
}
