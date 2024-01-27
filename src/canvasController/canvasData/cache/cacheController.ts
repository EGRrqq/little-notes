import { ITollsController, ToolsController } from "../../tools";
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

export class CacheController implements ICacheController {
  #elementDataController = new ElementDataController();
  #appDataController = new AppDataController();
  #storageDataKey = "LittleNotes";

  #toolsController: ITollsController;

  constructor(toolsController: ITollsController) {
    this.#toolsController = toolsController;

    this.#restoreDataElements();
  }

  mouseAttach(canvasEl: HTMLCanvasElement): void {
    canvasEl.addEventListener("mousedown", (e: MouseEvent) => {
      this.#elementDataController = new ElementDataController();

      this.#elementDataController.onPointerDown(
        e.clientX,
        e.clientY,
        this.#toolsController.activeTool.type
      );
    });

    canvasEl.addEventListener("mousemove", (e: MouseEvent) =>
      this.#elementDataController.onPointerMove(e.clientX, e.clientY)
    );

    canvasEl.addEventListener("mouseup", () => {
      this.#elementDataController.onPointerUp();

      this.storeDataElement(this.#elementDataController.elementData);
    });
  }

  touchAttach(canvasEl: HTMLCanvasElement): void {
    canvasEl.addEventListener("touchstart", (e: TouchEvent) => {
      this.#elementDataController = new ElementDataController();

      this.#elementDataController.onPointerDown(
        Math.round(e.touches[0].clientX),
        Math.round(e.touches[0].clientY),
        this.#toolsController.activeTool.type
      );
    });

    canvasEl.addEventListener("touchmove", (e: TouchEvent) =>
      this.#elementDataController.onPointerMove(
        Math.round(e.touches[0].clientX),
        Math.round(e.touches[0].clientY)
      )
    );

    canvasEl.addEventListener("touchend", () => {
      this.#elementDataController.onPointerUp();

      this.storeDataElement(this.#elementDataController.elementData);
    });
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

  storeDataElement(element: IElement) {
    this.#dataController.pushElement(element);
    localStorage.setItem(
      this.#dataKey,
      JSON.stringify(this.#dataController.elements)
    );
  }

  clearDataElements() {
    this.#dataController.elements = [];
    localStorage.removeItem(this.#dataKey);
  }

  #restoreDataElements() {
    const storageData = localStorage.getItem(this.#storageDataKey);

    if (storageData) {
      this.#appDataController.elements = JSON.parse(storageData);
    }
  }

  get #dataKey() {
    return this.#storageDataKey;
  }

  get #dataController() {
    return this.#appDataController;
  }
}
