export interface ICanvasController {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  moveOriginPointTo(x: number, y: number): void;
  resetOriginPoint(): void;

  setCanvasFullSize(): void;
  clearCanvasData(): void;
}

export class CanvasController implements ICanvasController {
  #canvasEl: HTMLCanvasElement;
  #context: CanvasRenderingContext2D | null;

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

  setCanvasFullSize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };

  clearCanvasData = () => {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  moveOriginPointTo = (x: number, y: number) => {
    this.ctx?.translate(x, y);
  };

  resetOriginPoint = () => {
    this.ctx?.setTransform(1, 0, 0, 1, 0, 0);
  };
}
