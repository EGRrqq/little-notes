import { ITollsController } from "../tools";
import { pointerData } from "./pointerData";

interface IMouseController {
  attach(): void;
}

export class MouseController implements IMouseController {
  #canvasEl: HTMLCanvasElement;
  #toolsController: ITollsController;

  constructor(canvas: HTMLCanvasElement, tools: ITollsController) {
    this.#canvasEl = canvas;
    this.#toolsController = tools;
  }

  attach() {
    this.#canvasEl.addEventListener("mousedown", this.#onMouseDown);
    this.#canvasEl.addEventListener("mousemove", this.#onMouseMove);
    this.#canvasEl.addEventListener("mouseup", this.#onMouseUp);
  }

  #onMouseDown = (e: MouseEvent) => {
    pointerData.pressed = true;

    pointerData.setPrevValues(e.clientX, e.clientY);
  };

  #onMouseMove = (e: MouseEvent) => {
    if (pointerData.pressed) {
      this.#toolsController.activeTool.draw(
        ...pointerData.getPrevValues(),
        e.clientX,
        e.clientY
      );

      pointerData.setPrevValues(e.clientX, e.clientY);
    }
  };

  #onMouseUp = () => {
    pointerData.pressed = false;
  };
}
