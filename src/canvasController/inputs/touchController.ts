import { CanvasController } from "..";
import { Pen } from "../tools";
import { pointerData } from "./pointerData";

interface ITouchController {
  onTouchStart(e: TouchEvent): void;
  onTouchMove(e: TouchEvent): void;
  onTouchEnd(e: TouchEvent): void;
}

export class TouchController implements ITouchController {
  #canvasController: CanvasController;
  #pen: Pen;

  constructor(canvasController: CanvasController, pen: Pen) {
    this.#canvasController = canvasController;
    this.#pen = pen;

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
      // get selectedTool()
      // selectedTool(e.clientX, e.clientY)
      this.#pen.draw(e.touches[0].pageX, e.touches[0].pageY);
    }
  };

  onTouchEnd = () => {
    pointerData.pressed = false;
  };
}
