export interface ITool {
  id: string;

  // type: depend on tools pen, rectangle etc
  type: string;

  // origin point coords
  // to easily manipulate with data
  x: number;
  y: number;

  // Bresenham's line algorithm
  // Ramer-Douglas-Peucker
  points: [number, number][];
  lastPoint: [number, number];

  // settings: IElementSettings;

  // boundingRect help to set width and height values
  // width?: number;
  // height?: number;
}
