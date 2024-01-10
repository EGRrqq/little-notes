import { CanvasController } from "..";
import { pointerData } from "../inputs/pointerData";

interface IPen {
  draw(curX: number, curY: number): void;
}

export class Pen implements IPen {
  #canvasController: CanvasController;

  constructor(canvasController: CanvasController) {
    this.#canvasController = canvasController;
  }

  draw(curX: number, curY: number) {
    if (this.#canvasController.ctx) {
      this.#canvasController.ctx.moveTo(...pointerData.getPrevValues());
      this.#canvasController.ctx.lineTo(curX, curY);
      this.#canvasController.ctx.closePath();
      this.#canvasController.ctx.stroke();

      // possible to split function into two diff, like draw and save state
      pointerData.setPrevValues(curX, curY);
    }
  }
}
