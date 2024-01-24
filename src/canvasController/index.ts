export interface ICanvasController {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  moveOriginPointTo(x: number, y: number): void;
  resetOriginPoint(): void;

  setCanvasFullSize(): void;
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

  setCanvasFullSize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };

  setProperFullSize = () => {
    // Get the DPR and size of the canvas
    const dpr = window.devicePixelRatio;

    // Set the "actual" size of the canvas
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;

    // Scale the context to ensure correct drawing operations
    this.ctx?.scale(dpr, dpr);

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

  resetOriginPoint = () => {
    this.ctx?.setTransform(1, 0, 0, 1, 0, 0);
  };
}
