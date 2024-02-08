//goal is to make runner run to clicked position and get the data back from the view
//here we don't use shadowDOM, but add rc- prefix to all id and classes to keep it unique inside
// of bigger document...
export class RangeSliderComponent extends HTMLElement {
  constructor() {
    super();

    // let shadowRoot = this.attachShadow({ mode: "open" });

    //this file has styles and html
    fetch("./RangerComponent/template.html")
      .then((response) => response.text())
      .then((htmlData) => {
        fetch("./RangerComponent/template.css")
          .then((res) => res.text())
          .then((cssData) => {
            let styleTag = document.getElementsByTagName("style")[0];
            if (!styleTag) {
              document.createElement("style");
              document.getElementsByTagName("head")[0].appendChild(styleTag);
            }
            styleTag.textContent += "\n" + cssData;

            this.innerHTML = htmlData;

            this.rangeEl = document.querySelector(".rc-range-element");
            this.rail = document.querySelector(".rc-rail");
            this.runner = document.querySelector(".rc-runner");
            this.needle = document.querySelector(".rc-needle");

            this.rangeEl.addEventListener(
              "click",
              this.moveToClickedCoord.bind(this) //or arrow function would work
            );
            document.addEventListener("keydown", this.keyHandler.bind(this));

            let h2Elem = document.getElementById("rc-data");
            console.log("h2Elem: ", h2Elem);
            const callback = function (mutationList) {
              for (let mutation of mutationList) {
                if (mutation.type === "characterData") {
                  document
                    .getElementById("ranger")
                    .dispatchEvent(new Event("rangeChange"));
                  console.log("range changed, should have emited event");
                }
              }
            };
            // Create a new observer instance
            const observer = new MutationObserver(callback);

            // Configure the observer to watch for changes
            const config = {
              characterData: true,
              subtree: false, // do not observe subtree
            };
            observer.observe(h2Elem, config);
          });
      });
  }

  keyHandler(event) {
    let rangeRect = this.rangeEl.getBoundingClientRect();
    let leftEdgeOfRange = rangeRect.left;
    let runnerRect = this.runner.getBoundingClientRect();
    let runnerLocalCoordX = runnerRect.left - leftEdgeOfRange;
    if (event.key === "ArrowRight") {
      if (runnerRect.right < rangeRect.right) {
        this.runner.style.left = Math.round(runnerLocalCoordX + 1) + "px";
      }
    }
    if (event.key === "ArrowLeft") {
      if (runnerLocalCoordX >= 0.5)
        this.runner.style.left = Math.round(runnerLocalCoordX - 1) + "px";
    }
    this.showData(
      this.getDataFromView(this.needle.getBoundingClientRect().right + 1)
    );
  }

  moveToClickedCoord(event) {
    //we switch to local coords by minus left edge of range
    let rangeRect = this.rangeEl.getBoundingClientRect();
    let runnerRect = this.runner.getBoundingClientRect();
    let clickedX = event.clientX;
    this.showData(this.getDataFromView(clickedX));
    let halfRunner = Math.round(runnerRect.width / 2);

    //left to the very edge
    if (clickedX < rangeRect.left + halfRunner) {
      this.runner.style.left = "0";
      return;
    }
    //right to the very edge
    if (clickedX > rangeRect.right - halfRunner) {
      this.runner.style.left = rangeRect.width - 2 * halfRunner + "px";

      return;
    }

    this.runner.style.left = clickedX - rangeRect.left - halfRunner + "px";
  }
  getDataFromView(x) {
    let leftEdge = this.rangeEl.getBoundingClientRect().left;
    let rightEdge = this.rangeEl.getBoundingClientRect().right;
    let halfRunnerWidth = this.runner.getBoundingClientRect().width / 2;

    let dx = x - leftEdge - halfRunnerWidth;

    if (dx < 0) dx = 0;
    let max = rightEdge - halfRunnerWidth;
    if (x > max) dx = max - leftEdge - halfRunnerWidth;

    return Math.round(dx);
  }

  showData(d) {
    let dataDisplay = document.getElementById("rc-data");
    dataDisplay.textContent = d;
  }
}
customElements.define("ranger-component", RangeSliderComponent);
