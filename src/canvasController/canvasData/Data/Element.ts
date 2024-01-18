import { IElement } from "./IElement";

interface IElementData {
  elementData: IElement;
}

// todo:
// static method to remove object by id
// like: ToolData.remove({id: "ryue25jfeoirieogh"});
// static remove(id: string): void {}
export class ElementData implements IElement, IElementData {
  #id: string = "";
  #points: [number, number][] = [];
  #type: string = "";
  #x: number = 0;
  #y: number = 0;
  #lastPoint: [number, number] = [0, 0];

  constructor() {
    this.#generateId(3);
  }

  // id + type
  get id() {
    return this.#id;
  }

  #generateId(times = 1): void {
    let i = 0;

    while (i < times) {
      this.#id += Math.random().toString(36).substring(2);

      i++;
    }
  }

  get type() {
    return this.#type;
  }

  set type(toolType: string) {
    this.#type = toolType;
  }

  // origin point
  get x(): number {
    return this.#x;
  }

  set x(xInitPos: number) {
    this.#x = xInitPos;
  }

  get y(): number {
    return this.#y;
  }

  set y(yInitPos: number) {
    this.#y = yInitPos;
  }

  // points
  get points() {
    return this.#points;
  }

  set point(pointArr: [number, number]) {
    this.#points.push(pointArr);
  }

  get lastPoint() {
    return this.#lastPoint;
  }

  set lastPoint(pointArr: [number, number]) {
    this.#lastPoint = pointArr;
  }

  get elementData(): IElement {
    return {
      id: this.id,
      points: this.points,
      type: this.type,
      x: this.x,
      y: this.y,
      lastPoint: this.lastPoint,
    };
  }
}
