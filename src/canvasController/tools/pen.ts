import { ITool } from "./ITool";
import { pointerData } from "../inputs/pointerData";

interface IPrevPosData {
  prevX: number;
  prevY: number;
}

interface ICurPosData {
  curX: number;
  curY: number;
}

export class Pen implements ITool {
  #context: CanvasRenderingContext2D;
  #type = "pen";

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }

  // possible to make draw method composable, maybe its a mess
  // - stroke()
  // - movePos()
  // - cacheStroke()

  get #ctx() {
    return this.#context;
  }

  get type() {
    return this.#type;
  }

  draw(curX: number, curY: number) {
    // ctx.save() for pen settings

    this.#ctx.beginPath();
    this.#ctx.moveTo(...pointerData.getPrevValues());
    this.#ctx.lineTo(curX, curY);
    this.#ctx.closePath();
    this.#ctx.stroke();

    // this.settings();
    // this.stroke();
    // this.move();

    pointerData.setPrevValues(curX, curY);
  }

  settings() {}
  stroke(ctx: CanvasRenderingContext2D, posData: IPrevPosData & ICurPosData) {
    ctx.beginPath();
    ctx.moveTo(posData.prevX, posData.prevY);
    ctx.lineTo(posData.curX, posData.curY);
    ctx.closePath();
    ctx.stroke();
  }
  move(prevPosData: IPrevPosData) {}

  // if user wants to remove caching, what i should do?
  // method should have an option to accept an object with users wants
  // like cacheData(x, y, { cache: false }), cache: true by default
  // it is a good option for specific tool settings, like line stroke, color etc.
  // but not for the cache, cache should be a global setting somehow
  // if i will do implement that, keep in mind about open/closed principle
}
