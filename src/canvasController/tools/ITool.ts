export interface ITool {
  type: string;
  draw(curX: number, curY: number): void;
}
