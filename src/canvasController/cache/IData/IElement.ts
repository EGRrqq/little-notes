export interface IElement {
  id: string;

  // type: depend on tools pen, rectangle etc
  type: string;

  // settings: IElementSettings;

  // boundingRect help to set width and height values
  width: number;
  height: number;

  // x, y to have an ability to move around drawing
  // x, y represent distance from 0, 0 canvas
  x: number;
  y: number;

  // always begin with [0,0]
  // Bresenham's line algorithm
  points: [number, number][];
  lastPoint: [number, number];
}
