import { CanvasController } from "..";
import { pointerData } from "./pointerData";

interface ITouchController {
  onTouchStart(e: TouchEvent): void;
  onTouchMove(e: TouchEvent): void;
  onTouchEnd(e: TouchEvent): void;
}

export class TouchController implements ITouchController {
  #canvasController: CanvasController;

  constructor(canvasController: CanvasController) {
    this.#canvasController = canvasController;

    this.#canvasController.canvas.addEventListener(
      "touchstart",
      this.onTouchStart,
    );
    this.#canvasController.canvas.addEventListener(
      "touchmove",
      this.onTouchMove,
    );
    this.#canvasController.canvas.addEventListener("touchend", this.onTouchEnd);
  }

  onTouchStart = (e: TouchEvent) => {
    pointerData.pressed = true;

    pointerData.setPrevValues(e.touches[0].pageX, e.touches[0].pageY);
  };

  onTouchMove = (e: TouchEvent) => {
    e.preventDefault();

    if (pointerData.pressed) {
      this.#canvasController.selectedTool?.draw(
        e.touches[0].pageX,
        e.touches[0].pageY,
      );
    }
  };

  onTouchEnd = () => {
    pointerData.pressed = false;
  };
}
