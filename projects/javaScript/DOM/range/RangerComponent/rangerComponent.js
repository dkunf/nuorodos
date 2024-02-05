//goal is to make runner run to clicked position and get the data back from the view
//we'll use shadowDOM to keep styles encapsulated
export class RangeSliderComponent extends HTMLElement {
  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });

    //this file has styles and html
    fetch("./RangerComponent/template.html")
      .then((response) => response.text())
      .then((data) => {
        let container = document.createElement("div");
        container.innerHTML = data;
        shadowRoot.append(container);

        this.rangeEl = shadowRoot.querySelector(".range-element");
        this.rail = shadowRoot.querySelector(".rail");
        this.runner = shadowRoot.querySelector(".runner");
        this.needle = shadowRoot.querySelector(".needle");

        this.rangeEl.addEventListener(
          "click",
          this.moveToClickedCoord.bind(this) //or arrow function would work
        );
        document.addEventListener("keydown", this.keyHandler.bind(this));
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
    let dataDisplay = this.shadowRoot.getElementById("data");
    dataDisplay.textContent = d;
  }
}
customElements.define("ranger-component", RangeSliderComponent);
