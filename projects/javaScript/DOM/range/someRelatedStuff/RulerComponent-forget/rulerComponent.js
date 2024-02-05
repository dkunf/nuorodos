//we split 1 component of ranger to 2, because ruller is not alwys needed
//this will be optional
// for now i don't know how to pass props, shadowRoot doesn't yet get loaded when i need it..
//quit for now
export class RulerComponent extends HTMLElement {
  //ruler needs to know where needle can reach at start and finish... need to pass it from ranger
  constructor(width = 400, height = 200, needleStart = 100, neeedleEnd = 200) {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });

    fetch("./RulerComponent/template.html")
      .then((response) => response.text())
      .then((data) => {
        let container = document.createElement("div");
        container.innerHTML = data;
        shadowRoot.append(container);

        this.rulerContainer = shadowRoot.querySelector(".ruler");
        this.canvas = shadowRoot.querySelector(".canvas");
        this.canvas.width = width;
        this.canvas.height = height + 100;
        this.ctx = this.canvas.getContext("2d");

        this.dataStep = this.drawRuler(needleStart, neeedleEnd);
      });
  }

  drawRuler(start, end) {
    let arr = Array(11).fill(1);
    //assuming only numbers for now
    let maxVal = Math.max(...arr.map((nr) => Math.abs(nr)));
    let normalized = arr.map((nr) => nr / maxVal);
    //now we need starting point and ending point:
    // let startingPoint =
    //   this.needle.getBoundingClientRect().x -
    //   this.canvas.getBoundingClientRect().x;
    // let endPoint = this.canvas.getBoundingClientRect().width - startingPoint;
    let range = end - start;
    let step = range / (arr.length - 1);

    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    let i = 0;
    //otherwise last one may not be painted
    let adjustment = end + 0.9 * step;
    for (let x = start; x <= adjustment; x += step) {
      this.ctx.moveTo(x, 100);
      this.ctx.lineTo(x, 150);
      this.ctx.strokeText(`${i}`, x - 2, 95);
      i++;
    }

    this.ctx.stroke();
    return step;
  }
}

customElements.define("ruler-for-ranger", RulerComponent);

// export default RulerComponent;
