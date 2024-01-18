import "./style.css";

import { CanvasController } from "./canvasController";
import { MouseController, TouchController } from "./canvasController/inputs";
import { Pen, ToolsController } from "./canvasController/tools";

const board = document.getElementById("board") as HTMLCanvasElement;
const boardController = new CanvasController(board);

if (boardController.ctx) {
  // available tools
  const pen = new Pen(boardController.ctx);
  const toolsList = [pen];

  const toolsController = new ToolsController(toolsList, pen.type);
  boardController.tools = toolsController;

  // inputs = []
  const mouseController = new MouseController(board, toolsController);
  const touchController = new TouchController(board, toolsController);

  mouseController.attach();
  touchController.attach();

  // need single cache controller for all inputs
  // now all input create it separately
  // maybe it better to create cacheController in that file
  // and use attach method
}

// for move use ctx.translate()
// for zoom use ctx.scale()

window.addEventListener("load", boardController.setCanvasFullSize, {
  once: true,
});

window.addEventListener("resize", boardController.setCanvasFullSize);
