let MODE = "none";
let LAST_CLICKED_EL;

// {} = f(#id,#id,#id,#id)
let menuBtns = createMenu(
  "height-adj--mode-btn",
  "padding-adj-mode-btn",
  "margin-adj-mode-btn",
  "save-exit-btn"
);

document.addEventListener("click", globalEventHandler);

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
