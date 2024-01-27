export interface IStrokeTool {
  type: string;
  settings: IStrokeSettings;

  draw(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    settings?: IStrokeSettings
  ): void;
}

export type IStrokeSettings = Pick<
  CanvasRenderingContext2D,
  "strokeStyle" | "lineWidth" | "lineJoin" | "lineCap"
>;
