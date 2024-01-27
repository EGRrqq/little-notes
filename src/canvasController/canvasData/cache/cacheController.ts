import { ITollsController } from "../../tools";
import {
  AppDataController,
  ElementDataController,
  IData,
  IElement,
} from "../Data";

export interface ICacheController {
  appData: IData;

  mouseAttach(canvasEl: HTMLCanvasElement): void;
  touchAttach(canvasEl: HTMLCanvasElement): void;

  iterateOverPoints: (points: IElement["points"]) => void;

  storeDataElement: (element: IElement) => void;
  clearDataElements: () => void;
}

// move onPointer stuff to the element controller
export class CacheController implements ICacheController {
  #appDataController = new AppDataController();
  #storageDataKey = "LittleNotes";

  constructor() {
    this.#restoreDataElements();
  }

  mouseAttach(ctx: CanvasRenderingContext2D): void {
    const elementDataController = new ElementDataController(ctx, "pen");

    ctx.canvas.addEventListener("mousedown", (e: MouseEvent) =>
      elementDataController.onPointerDown(e.clientX, e.clientY)
    );

    ctx.canvas.addEventListener("mousemove", (e: MouseEvent) =>
      elementDataController.onPointerMove(e.clientX, e.clientY)
    );

    ctx.canvas.addEventListener("mouseup", () => {
      elementDataController.onPointerUp();
      this.storeDataElement(elementDataController.elementData);
    });
  }

  touchAttach(ctx: CanvasRenderingContext2D): void {
    const elementDataController = new ElementDataController(ctx, "pen");

    ctx.canvas.addEventListener("touchstart", (e: TouchEvent) =>
      elementDataController.onPointerDown(
        Math.round(e.touches[0].clientX),
        Math.round(e.touches[0].clientY)
      )
    );

    ctx.canvas.addEventListener("touchmove", (e: TouchEvent) =>
      elementDataController.onPointerMove(
        Math.round(e.touches[0].clientX),
        Math.round(e.touches[0].clientY)
      )
    );

    ctx.canvas.addEventListener("touchend", () => {
      elementDataController.onPointerUp();
      this.storeDataElement(elementDataController.elementData);
    });
  }

  iterateOverPoints = (
    points: IElement["points"],
    draw: ITollsController["activeTool"]["draw"],
    settings: IElement["settings"]
  ) => {
    for (let i = 0, length = points.length - 1; i < length; i++) {
      let x0 = points[i][0];
      let y0 = points[i][1];

      let x1 = points[i + 1][0];
      let y1 = points[i + 1][1];

      console.log("over");
      () => draw(x0, y0, x1, y1, settings);
    }
  };

  get appData(): IData {
    return this.#appDataController.allData;
  }

  storeDataElement(element: IElement) {
    this.#dataController.pushElement(element);
    localStorage.setItem(
      this.#dataKey,
      JSON.stringify(this.#dataController.elements)
    );
  }

  #restoreDataElements() {
    const storageData = localStorage.getItem(this.#storageDataKey);

    if (storageData) {
      this.#dataController.elements = JSON.parse(storageData);
    }
  }

  clearDataElements() {
    this.#dataController.elements = [];
    localStorage.removeItem(this.#dataKey);
  }

  get #dataKey() {
    return this.#storageDataKey;
  }

  get #dataController() {
    return this.#appDataController;
  }
}
