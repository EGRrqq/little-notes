import "./style.css";

import { CanvasController } from "./canvasController";
import { MouseController, TouchController } from "./canvasController/inputs";
import { Pen } from "./canvasController/tools";

const board = document.getElementById("board") as HTMLCanvasElement;

const boardController = new CanvasController(board);

// inputs with attach/detach methods
new MouseController(boardController);
new TouchController(boardController);

// tools = []
// inputs = []

const pen = new Pen(boardController);
boardController.selectTool = pen;

window.addEventListener("load", boardController.setCanvasFullSize, {
  once: true,
});
