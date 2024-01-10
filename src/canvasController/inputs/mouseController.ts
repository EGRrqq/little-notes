import { CanvasController } from "..";
import { Pen } from "../tools";
import { pointerData } from "./pointerData";

interface IMouseController {
  onMouseDown(e: MouseEvent): void;
  onMouseMove(e: MouseEvent): void;
  onMouseUp(e: MouseEvent): void;
}

export class MouseController implements IMouseController {
  #canvasController: CanvasController;
  #pen: Pen;

  constructor(canvasController: CanvasController, pen: Pen) {
    this.#canvasController = canvasController;
    this.#pen = pen;

    this.#canvasController.canvas.addEventListener(
      "mousedown",
      this.onMouseDown,
    );
    this.#canvasController.canvas.addEventListener(
      "mousemove",
      this.onMouseMove,
    );
    this.#canvasController.canvas.addEventListener("mouseup", this.onMouseUp);
  }

  onMouseDown = (e: MouseEvent) => {
    pointerData.pressed = true;

    pointerData.setPrevValues(e.clientX, e.clientY);
  };

  onMouseMove = (e: MouseEvent) => {
    if (pointerData.pressed) {
      // get selectedTool()
      // selectedTool(e.clientX, e.clientY)
      this.#pen.draw(e.clientX, e.clientY);
    }
  };

  onMouseUp = () => {
    pointerData.pressed = false;
  };
}
