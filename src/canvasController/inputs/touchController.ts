import { ITollsController } from "../tools";
import { pointerData } from "./pointerData";

interface ITouchController {
  attach(): void;
}

// need multi touch support
export class TouchController implements ITouchController {
  #canvasEl: HTMLCanvasElement;
  #toolsController: ITollsController;

  constructor(canvas: HTMLCanvasElement, tools: ITollsController) {
    this.#canvasEl = canvas;
    this.#toolsController = tools;
  }

  attach() {
    this.#canvasEl.addEventListener("touchstart", this.#onTouchStart);
    this.#canvasEl.addEventListener("touchmove", this.#onTouchMove);
    this.#canvasEl.addEventListener("touchend", this.#onTouchEnd);
  }

  #onTouchStart = (e: TouchEvent) => {
    pointerData.pressed = true;

    pointerData.setPrevValues(e.touches[0].clientX, e.touches[0].clientY);
  };

  #onTouchMove = (e: TouchEvent) => {
    e.preventDefault();

    if (pointerData.pressed) {
      this.#toolsController.selectedTool.draw(
        ...pointerData.getPrevValues(),
        Math.round(e.touches[0].clientX),
        Math.round(e.touches[0].clientY)
      );

      pointerData.setPrevValues(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  #onTouchEnd = () => {
    pointerData.pressed = true;
  };
}
