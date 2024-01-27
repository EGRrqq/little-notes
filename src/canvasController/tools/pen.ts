import { IStrokeSettings, IStrokeTool } from "./IStrokeTool";

// todo:
// option for specific tool settings, like line stroke, color etc.
// like draw(x, y, { lineWidth: 3, strokeStyle: #fff })
export class Pen implements IStrokeTool {
  #context: CanvasRenderingContext2D;
  #type = "pen";
  #settings: IStrokeSettings = {
    strokeStyle: "#fff",
    lineWidth: 3,
    lineCap: "round",
    lineJoin: "round",
  };

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }

  get #ctx() {
    return this.#context;
  }

  get type() {
    return this.#type;
  }

  get settings() {
    return this.#settings;
  }

  // todo: move settings into separate func
  // tools controller should have an ability to change current tool settings
  draw(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    settings: IStrokeSettings = this.#settings
  ) {
    for (let prop in settings) {
      //@ts-ignore
      this.#ctx[prop] = settings[prop];
    }

    this.#ctx.beginPath();
    this.#ctx.moveTo(x0, y0);
    this.#ctx.lineTo(x1, y1);
    this.#ctx.closePath();
    this.#ctx.stroke();
  }
}
