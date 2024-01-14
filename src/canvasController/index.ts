import { ITollsController } from "./tools";

export interface ICanvasController {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  setCanvasFullSize(): void;
}

export class CanvasController implements ICanvasController {
  #canvasEl: HTMLCanvasElement;
  #context: CanvasRenderingContext2D | null;
  #toolsController: ITollsController | null = null;

  constructor(board: HTMLCanvasElement) {
    this.#canvasEl = board;

    this.#context = this.canvas.getContext("2d");
  }

  get canvas(): HTMLCanvasElement {
    return this.#canvasEl;
  }

  get ctx(): CanvasRenderingContext2D | null {
    return this.#context;
  }

  get tools(): ITollsController | null {
    return this.#toolsController ? this.#toolsController : null;
  }

  set tools(toolsController: ITollsController) {
    this.#toolsController = toolsController;
  }

  setCanvasFullSize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };
}
