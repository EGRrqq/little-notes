import { CacheController, ICacheController } from "../canvasData/cache";
import { ITollsController } from "../tools";
import { pointerData } from "./pointerData";

interface ITouchController {
  attach(): void;
}

export class TouchController implements ITouchController {
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
    this.#canvasEl.addEventListener("touchstart", this.#onTouchStart);

    this.#canvasEl.addEventListener("touchmove", this.#onTouchMove);

    this.#canvasEl.addEventListener("touchend", this.#onTouchEnd);
  }

  #onTouchStart = (e: TouchEvent) => {
    this.#pressed = true;

    pointerData.setPrevValues(e.touches[0].pageX, e.touches[0].pageY);
    this.#cacheController.onPointerDown(e.touches[0].pageX, e.touches[0].pageY);
  };

  #onTouchMove = (e: TouchEvent) => {
    e.preventDefault();

    if (this.#pressed) {
      this.#toolsController.selectedTool.draw(
        e.touches[0].pageX,
        e.touches[0].pageY
      );

      this.#cacheController.onPointerMove(
        e.touches[0].pageX,
        e.touches[0].pageY
      );
    }
  };

  #onTouchEnd = (e: TouchEvent) => {
    this.#pressed = false;

    this.#cacheController.onPointerUp(
      e.changedTouches[0].pageX,
      e.changedTouches[0].pageY
    );
  };
}
