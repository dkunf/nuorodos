//goal is to make runner run to clicked position and get the data back from the view
//I will want to make it have continuos real values instead of descrete like natural or
//characters...

//lets make 1 component out of it and then split to range and ruler
//  separate components to make ruler optional

export class RangeSliderComponent extends HTMLElement {
  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: "open" });

    fetch("./template.html")
      .then((response) => response.text())
      .then((data) => {
        let cont = document.createElement("div");
        cont.innerHTML = data;
        shadowRoot.append(cont);

        this.rangeEl = shadowRoot.querySelector(".range-element");
        this.rail = shadowRoot.querySelector(".rail");
        this.runner = shadowRoot.querySelector(".runner");
        this.needle = shadowRoot.querySelector(".needle");
        this.rulerContainer = shadowRoot.querySelector(".ruler");
        this.canvas = shadowRoot.querySelector(".canvas");
        console.log("this: ", this);
        this.canvas.width = this.rangeEl.getBoundingClientRect().width;
        this.canvas.height = this.rangeEl.getBoundingClientRect().height + 100;
        this.ctx = this.canvas.getContext("2d");

        this.rangeEl.addEventListener(
          "click",
          this.moveToClickedCoord.bind(this) //or arrow function would work
        );
        document.addEventListener("keydown", this.keyHandler.bind(this));

        // logAllRects();
        this.dataStep = this.drawRuler();
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

  //now i want to add ruler or some reference to data
  //i am thinking of precision of 1px, can i do it like
  //on the slankmatis?
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
    //how many steps from beginning to this coord?
    let dx = x - this.canvas.getBoundingClientRect().left;

    return Math.round(dx / this.dataStep) - 1;
  }

  showData(d) {
    let dataDisplay = this.shadowRoot.getElementById("data");
    dataDisplay.textContent = d;
  }

  drawRuler() {
    let arr = Array(11).fill(1);
    //assuming only numbers for now
    let maxVal = Math.max(...arr.map((nr) => Math.abs(nr)));
    let normalized = arr.map((nr) => nr / maxVal);
    //now we need starting point and ending point:
    let startingPoint =
      this.needle.getBoundingClientRect().x -
      this.canvas.getBoundingClientRect().x;
    let endPoint = this.canvas.getBoundingClientRect().width - startingPoint;
    let range = endPoint - startingPoint;
    let step = range / (arr.length - 1);

    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    let i = 0;
    //otherwise last one may not be painted
    let adjustment = endPoint + 0.9 * step;
    for (let x = startingPoint; x <= adjustment; x += step) {
      this.ctx.moveTo(x, 100);
      this.ctx.lineTo(x, 150);
      this.ctx.strokeText(`${i}`, x - 2, 95);
      i++;
    }

    this.ctx.stroke();
    return step;
  }

  logAllRects() {
    let rangeRect = this.rangeEl.getBoundingClientRect();
    let railRect = this.rail.getBoundingClientRect();
    let runnerRect = this.runner.getBoundingClientRect();
    let needleRect = this.needle.getBoundingClientRect();
    let rulerContainerRect = this.rulerContainer.getBoundingClientRect();
    let canvasRect = this.canvas.getBoundingClientRect();

    let rectangles = [
      rangeRect,
      railRect,
      runnerRect,
      needleRect,
      rulerContainerRect,
      canvasRect,
    ];

    console.log(`

        rangeRect, railRect, runnerRect, needleRect, rulerContainerRect, canvasRect

        leftSides:
        ${rectangles.map((r) => r.left)}
        rightSides:
        ${rectangles.map((r) => r.right)}
        widths:
        ${rectangles.map((r) => r.width)}
        `);
  }
}
customElements.define("ranger-component", RangeSliderComponent);

export default RangeSliderComponent;
