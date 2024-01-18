import "./style.css";

import { CanvasController } from "./canvasController";
import { MouseController, TouchController } from "./canvasController/inputs";
import { Pen, ToolsController } from "./canvasController/tools";
import { CacheController } from "./canvasController/canvasData/cache";

const board = document.getElementById("board") as HTMLCanvasElement;
const boardController = new CanvasController(board);

if (boardController.ctx) {
  // available tools
  const pen = new Pen(boardController.ctx);
  const toolList = [pen];

  const toolsController = new ToolsController(toolList, pen.type);

  // inputs = []
  const mouseController = new MouseController(board, toolsController);
  const touchController = new TouchController(board, toolsController);

  mouseController.attach();
  touchController.attach();

  // cache setup
  const cacheController = new CacheController(toolsController);

  cacheController.mouseAttach();
  cacheController.touchAttach();

  const redrawData = () => {
    boardController.moveOriginPointTo(...cacheController.originPoint);
    cacheController.iterateOverPoints();
    boardController.resetOriginPoint();
  };

  window.addEventListener("resize", () => {
    boardController.setCanvasFullSize();
    boardController.clearCanvasData();

    requestAnimationFrame(redrawData);
  });
}

// for move use ctx.translate()
// for zoom use ctx.scale()

window.addEventListener("load", boardController.setCanvasFullSize, {
  once: true,
});
