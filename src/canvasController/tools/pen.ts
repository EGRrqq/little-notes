import { ITool } from "./ITool";

// todo:
// option for specific tool settings, like line stroke, color etc.
// like draw(x, y, { lineWidth: 3, strokeStyle: #fff })
export class Pen implements ITool {
  #context: CanvasRenderingContext2D;
  #type = "pen";

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }

  get #ctx() {
    return this.#context;
  }

  get type() {
    return this.#type;
  }

  // todo: move settings into separate func
  // tools controller should have an ability to change current tool settings
  draw(x0: number, y0: number, x1: number, y1: number) {
    this.#ctx.strokeStyle = "#fff";

    this.#ctx.beginPath();
    this.#ctx.moveTo(x0, y0);
    this.#ctx.lineTo(x1, y1);
    this.#ctx.closePath();
    this.#ctx.stroke();
  }

  settings() {
    // ctx.save()
    // settings stuff
    // ctx.restore
  }
}
