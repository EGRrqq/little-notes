import { CacheController, ICacheController } from "../canvasData/cache";
import { ITollsController } from "../tools";
import { pointerData } from "./pointerData";

interface IMouseController {
  attach(): void;
}

export class MouseController implements IMouseController {
  #canvasEl: HTMLCanvasElement;
  #toolsController: ITollsController;
  #cacheController: ICacheController;

  #pressed = false;

  constructor(canvas: HTMLCanvasElement, tools: ITollsController) {
    this.#canvasEl = canvas;
    this.#toolsController = tools;

    this.#cacheController = new CacheController(this.#toolsController);
  }

  attach() {
    this.#canvasEl.addEventListener("mousedown", this.#onMouseDown);

    this.#canvasEl.addEventListener("mousemove", this.#onMouseMove);

    this.#canvasEl.addEventListener("mouseup", this.#onMouseUp);
  }

  #onMouseDown = (e: MouseEvent) => {
    this.#pressed = true;

    // remove pointerData
    pointerData.setPrevValues(e.clientX, e.clientY);

    this.#cacheController.onPointerDown(e.clientX, e.clientY);
  };

  #onMouseMove = (e: MouseEvent) => {
    if (this.#pressed) {
      // canvas.getBoundingClientRect() is a common way to obtain the position of an element relative to the viewport
      this.#toolsController.selectedTool.draw(e.clientX, e.clientY);

      this.#cacheController.onPointerMove(e.clientX, e.clientY);
    }
  };

  #onMouseUp = (e: MouseEvent) => {
    this.#pressed = false;
    this.#cacheController.onPointerUp(e.clientX, e.clientY);
  };
}
