export interface ICanvasController {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  moveOriginPointTo(x: number, y: number): void;
  resetOriginPoint(windowDpr: number): void;

  setCanvasFullSize(
    windowWidth: number,
    windowHeight: number,
    windowDpr: number
  ): void;
  clearCanvasData(): void;
}

// todo: move and zoom canvas
// for move use ctx.translate()
// for zoom use ctx.scale()
export class CanvasController implements ICanvasController {
  #canvasEl: HTMLCanvasElement;
  #context: CanvasRenderingContext2D | null;

  constructor(board: HTMLCanvasElement) {
    this.#canvasEl = board;

    // alpha: true
    this.#context = this.canvas.getContext("2d");
  }

  get canvas(): HTMLCanvasElement {
    return this.#canvasEl;
  }

  get ctx(): CanvasRenderingContext2D | null {
    return this.#context;
  }

  setCanvasFullSize = (
    windowWidth: number,
    windowHeight: number,
    windowDpr: number
  ) => {
    // Set the "actual" size of the canvas
    this.canvas.width = windowWidth * windowDpr;
    this.canvas.height = windowHeight * windowDpr;

    // Scale the context to ensure correct drawing operations
    this.ctx?.scale(windowDpr, windowDpr);

    // Set the "drawn" size of the canvas
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
  };

  clearCanvasData = () => {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  moveOriginPointTo = (x: number, y: number) => {
    this.ctx?.translate(x, y);
  };

  resetOriginPoint = (windowDpr: number) => {
    // reset to init scale
    this.ctx?.setTransform(windowDpr, 0, 0, windowDpr, 0, 0);
  };
}
