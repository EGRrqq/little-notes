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
    pointerData.pressed = true;

    pointerData.setPrevValues(e.touches[0].pageX, e.touches[0].pageY);
    this.#cacheController.onPointerDown(e.touches[0].pageX, e.touches[0].pageY);
  };

  #onTouchMove = (e: TouchEvent) => {
    e.preventDefault();

    if (pointerData.pressed) {
      this.#toolsController.selectedTool.draw(
        ...pointerData.getPrevValues(),
        e.touches[0].pageX,
        e.touches[0].pageY
      );

      pointerData.setPrevValues(e.touches[0].pageX, e.touches[0].pageY);
      this.#cacheController.onPointerMove(
        e.touches[0].pageX,
        e.touches[0].pageY
      );
    }
  };

  #onTouchEnd = (e: TouchEvent) => {
    pointerData.pressed = true;

    this.#cacheController.onPointerUp(
      e.changedTouches[0].pageX,
      e.changedTouches[0].pageY
    );
  };
}
