import { ITollsController } from "../../tools";
import {
  AppDataController,
  ElementDataController,
  IData,
  IElement,
} from "../Data";
import { IElementDataController } from "../Data/ElementDataController";

export interface ICacheController {
  appData: IData;

  mouseAttach(ctx: CanvasRenderingContext2D): void;
  touchAttach(ctx: CanvasRenderingContext2D): void;

  iterateOverPoints: (
    points: IElement["points"],
    settings: IElement["settings"]
  ) => void;

  storeDataElement: (element: IElement) => void;
  clearDataElements: () => void;
}

export class CacheController implements ICacheController {
  #elementDataController: IElementDataController;
  #appDataController = new AppDataController();
  #storageDataKey = "LittleNotes";

  #toolsController: ITollsController;
  #ctx: CanvasRenderingContext2D;

  constructor(
    ctx: CanvasRenderingContext2D,
    toolsController: ITollsController
  ) {
    this.#ctx = ctx;
    this.#toolsController = toolsController;

    this.#elementDataController = new ElementDataController(
      ctx,
      toolsController.activeTool.settings
    );

    // also need to restore last element settings
    this.#restoreDataElements();
  }

  mouseAttach(): void {
    this.#ctx.canvas.addEventListener("mousedown", (e: MouseEvent) => {
      this.#elementDataController = new ElementDataController(
        this.#ctx,
        this.#toolsController.activeTool.settings
      );

      this.#elementDataController.onPointerDown(
        e.clientX,
        e.clientY,
        this.#toolsController.activeTool.type
      );
    });

    this.#ctx.canvas.addEventListener("mousemove", (e: MouseEvent) =>
      this.#elementDataController.onPointerMove(e.clientX, e.clientY)
    );

    this.#ctx.canvas.addEventListener("mouseup", () => {
      this.#elementDataController.onPointerUp();

      this.storeDataElement(this.#elementDataController.elementData);
    });
  }

  touchAttach(): void {
    this.#ctx.canvas.addEventListener("touchstart", (e: TouchEvent) => {
      this.#elementDataController = new ElementDataController(
        this.#ctx,
        this.#toolsController.activeTool.settings
      );

      this.#elementDataController.onPointerDown(
        Math.round(e.touches[0].clientX),
        Math.round(e.touches[0].clientY),
        this.#toolsController.activeTool.type
      );
    });

    this.#ctx.canvas.addEventListener("touchmove", (e: TouchEvent) =>
      this.#elementDataController.onPointerMove(
        Math.round(e.touches[0].clientX),
        Math.round(e.touches[0].clientY)
      )
    );

    this.#ctx.canvas.addEventListener("touchend", () => {
      this.#elementDataController.onPointerUp();

      this.storeDataElement(this.#elementDataController.elementData);
    });
  }

  iterateOverPoints = (
    points: IElement["points"],
    settings: IElement["settings"]
  ) => {
    for (let i = 0, length = points.length - 1; i < length; i++) {
      let x0 = points[i][0];
      let y0 = points[i][1];

      let x1 = points[i + 1][0];
      let y1 = points[i + 1][1];

      this.#toolsController.activeTool.draw(x0, y0, x1, y1, settings);
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
