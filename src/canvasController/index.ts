import { ITool } from "./tools";

export interface ICanvasController {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  setCanvasFullSize(): void;
}

export class CanvasController implements ICanvasController {
  #canvasEl: HTMLCanvasElement;
  #selectedTool: ITool | null = null;

  constructor(board: HTMLCanvasElement) {
    this.#canvasEl = board;
  }

  get canvas() {
    return this.#canvasEl;
  }

  get ctx() {
    return this.canvas.getContext("2d");
  }

  setCanvasFullSize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };

  set selectTool(tool: ITool) {
    this.#selectedTool = tool;
  }

  get selectedTool() {
    return this.#selectedTool;
  }
}
