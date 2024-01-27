export interface IStrokeTool {
  type: string;
  draw(x0: number, y0: number, x1: number, y1: number): void;
}
