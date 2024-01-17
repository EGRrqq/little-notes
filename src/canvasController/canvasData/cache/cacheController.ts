import { ITollsController } from "../../tools";
import { ToolData } from "../Data/Tool";

export interface ICacheController {
  onPointerDown(x: number, y: number): void;
  onPointerMove(x: number, y: number): void;
  onPointerUp(x: number, y: number): void;
}

export class CacheController implements ICacheController {
  #toolCache = new ToolData();
  #toolsController: ITollsController;

  constructor(toolsController: ITollsController) {
    this.#toolsController = toolsController;
  }

  get #cache() {
    return this.#toolCache;
  }

  set #cache(data: ToolData) {
    this.#toolCache = data;
  }

  onPointerDown = (x: number, y: number) => {
    this.#cache = new ToolData();

    this.#cache.type = this.#toolsController.selectedTool.type;

    // set up origin point
    // to calculate points from new origin point
    this.#cache.x = x;
    this.#cache.y = y;

    // first coord, basically onMouseDown coord
    this.#cache.point = [0, 0];
  };

  onPointerMove = (x: number, y: number) => {
    this.#cache.point = [x - this.#cache.x, y - this.#cache.y];
    this.#cache.lastPoint = [x - this.#cache.x, y - this.#cache.y];
  };

  onPointerUp = (x: number, y: number) => {
    // set width/height

    // set data to IFile

    console.log(this.#cache.toolData);
    console.log("--------------");
  };
}
