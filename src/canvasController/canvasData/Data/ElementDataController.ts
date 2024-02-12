import { IStrokeSettings } from "../../tools/IStrokeTool";
import { IElement } from "./IElement";

export interface IElementDataController {
  elementData: IElement;

  onPointerDown: (x: number, y: number, type: string) => void;
  onPointerMove: (x: number, y: number) => void;
  onPointerUp: () => void;
}

// todo:
// static method to remove object by id
// like: ToolData.remove({id: "ryue25jfeoirieogh"});
// static remove(id: string): void {}
export class ElementDataController implements IElementDataController {
  #ctx: CanvasRenderingContext2D;
  #captureFlag = false;

  #id: string = "";
  #points: [number, number][] = [];
  #type: string = "";
  #x: number = 0;
  #y: number = 0;
  #lastPoint: [number, number] = [0, 0];
  #settings: IStrokeSettings;

  constructor(ctx: CanvasRenderingContext2D, settings: IStrokeSettings) {
    this.#ctx = ctx;

    //@ts-ignore
    this.#settings = {};
    Object.assign(this.#settings, settings);

    this.#generateId(3);
  }

  get elementData(): IElement {
    return {
      id: this.#id,
      points: this.#points,
      type: this.#type,
      x: this.#x,
      y: this.#y,
      lastPoint: this.#lastPoint,
      settings: this.#settings,
    };
  }

  onPointerDown = (x: number, y: number, type: string) => {
    this.#captureFlag = true;

    this.#type = type;

    // set up origin point
    // to calculate points from new origin point
    this.#x = x;
    this.#y = y;

    // first coord, basically onMouseDown coord
    this.#point = [0, 0];
    this.#lastPoint = [0, 0];
  };

  onPointerMove = (x: number, y: number) => {
    if (this.#captureFlag) {
      this.#point = [x - this.#x, y - this.#y];
      this.#lastPoint = [x - this.#x, y - this.#y];
    }
  };

  onPointerUp = () => {
    this.#captureFlag = false;
    this.#assignSettings(this.#settings);

    // set width/height
  };

  set #point(pointArr: [number, number]) {
    this.#points.push(pointArr);
  }

  #generateId(times = 1): void {
    let i = 0;

    while (i < times) {
      this.#id += Math.random().toString(36).substring(2);

      i++;
    }
  }

  #assignSettings(settings: IStrokeSettings) {
    for (let prop in settings) {
      //@ts-ignore
      settings[prop] = this.#ctx[prop];
    }
  }
}
