import { ITollsController } from "../../tools";
import {
  DataController,
  ElementDataController,
  IData,
  IElement,
} from "../Data";

export interface ICacheController {
  appData: IData;

  mouseAttach(): void;
  touchAttach(): void;

  iterateOverPoints: (points: IElement["points"]) => void;
}

export class CacheController implements ICacheController {
  #captureFlag = false;

  #appDataController = new DataController();
  #storageDataKey = "LittleNotes";

  #toolCache = new ElementDataController();
  #toolsController: ITollsController;

  constructor(toolsController: ITollsController) {
    this.#toolsController = toolsController;

    const storageData = localStorage.getItem(this.#storageDataKey);

    if (storageData) {
      this.#appDataController.elements = JSON.parse(storageData);
    }
  }

  mouseAttach(): void {
    window.addEventListener("mousedown", (e: MouseEvent) =>
      this.#onPointerDown(e.clientX, e.clientY)
    );

    window.addEventListener("mousemove", (e: MouseEvent) =>
      this.#onPointerMove(e.clientX, e.clientY)
    );

    window.addEventListener("mouseup", () => this.#onPointerUp());
  }

  touchAttach(): void {
    window.addEventListener("touchstart", (e: TouchEvent) =>
      this.#onPointerDown(
        Math.round(e.touches[0].clientX),
        Math.round(e.touches[0].clientY)
      )
    );

    window.addEventListener("touchmove", (e: TouchEvent) =>
      this.#onPointerMove(
        Math.round(e.touches[0].clientX),
        Math.round(e.touches[0].clientY)
      )
    );

    window.addEventListener("touchend", () => this.#onPointerUp());
  }

  iterateOverPoints = (points: IElement["points"]) => {
    for (let i = 0, length = points.length - 1; i < length; i++) {
      let x0 = points[i][0];
      let y0 = points[i][1];

      let x1 = points[i + 1][0];
      let y1 = points[i + 1][1];

      this.#toolsController.activeTool.draw(x0, y0, x1, y1);
    }
  };

  get appData(): IData {
    return this.#appDataController.allData;
  }

  get #dataKey() {
    return this.#storageDataKey;
  }

  get #dataController() {
    return this.#appDataController;
  }

  get #cacheController() {
    return this.#toolCache;
  }

  set #cacheController(data: ElementDataController) {
    this.#toolCache = data;
  }

  // todo:
  // accept tool stuff in settings obj
  // like (x: number, y: number { type: string, lineWidth: number })
  #onPointerDown = (x: number, y: number) => {
    this.#captureFlag = true;

    this.#cacheController = new ElementDataController();

    this.#cacheController.type = this.#toolsController.activeTool.type;

    // set up origin point
    // to calculate points from new origin point
    this.#cacheController.x = x;
    this.#cacheController.y = y;

    // first coord, basically onMouseDown coord
    this.#cacheController.point = [0, 0];
    this.#cacheController.lastPoint = [0, 0];
  };

  #onPointerMove = (x: number, y: number) => {
    if (this.#captureFlag) {
      this.#cacheController.point = [
        x - this.#cacheController.x,
        y - this.#cacheController.y,
      ];
      this.#cacheController.lastPoint = [
        x - this.#cacheController.x,
        y - this.#cacheController.y,
      ];
    }
  };

  #onPointerUp = () => {
    this.#captureFlag = false;

    this.#dataController.pushElement(this.#cacheController.elementData);
    localStorage.setItem(
      this.#dataKey,
      JSON.stringify(this.#dataController.elements)
    );

    // set width/height
  };
}
