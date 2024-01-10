export interface ICanvasController {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  setCanvasFullSize(): void;
}

export class CanvasController implements ICanvasController {
  private readonly canvasEl: HTMLCanvasElement;

  constructor(board: HTMLCanvasElement) {
    this.canvasEl = board;
  }

  get canvas() {
    return this.canvasEl;
  }

  get ctx() {
    return this.canvas.getContext("2d");
  }

  setCanvasFullSize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  };
}
