import { CanvasController } from "..";
import { pointerData } from "./pointerData";

interface IMouseController {
  attach(): void;
}

export class MouseController implements IMouseController {
  #canvasController: CanvasController;

  constructor(canvasController: CanvasController) {
    this.#canvasController = canvasController;
  }

  attach() {
    this.#canvasController.canvas.addEventListener(
      "mousedown",
      this.#onMouseDown
    );

    this.#canvasController.canvas.addEventListener(
      "mousemove",
      this.#onMouseMove
    );

    this.#canvasController.canvas.addEventListener("mouseup", this.#onMouseUp);
  }

  #onMouseDown = (e: MouseEvent) => {
    pointerData.pressed = true;

    pointerData.setPrevValues(e.clientX, e.clientY);
  };

  #onMouseMove = (e: MouseEvent) => {
    if (pointerData.pressed) {
      // canvas.getBoundingClientRect() is a common way to obtain the position of an element relative to the viewport
      this.#canvasController.selectedTool?.draw(e.clientX, e.clientY);
    }
  };

  #onMouseUp = () => {
    pointerData.pressed = false;
  };
}
