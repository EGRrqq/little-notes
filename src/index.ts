import "./style.css";

import { CanvasController } from "./canvasController";
import { MouseController, TouchController } from "./canvasController/inputs";
import { Pen } from "./canvasController/tools";
import { CacheController } from "./canvasController/features";

const board = document.getElementById("board") as HTMLCanvasElement;

const boardController = new CanvasController(board);

// inputs with attach/detach methods
new MouseController(boardController);
new TouchController(boardController);

// tools = []
// inputs = []

const cacheController = new CacheController(boardController);
cacheController.mouseAttach();
cacheController.touchAttach();

const pen = new Pen(boardController);
boardController.selectTool = pen;

window.addEventListener("load", boardController.setCanvasFullSize, {
  once: true,
});

window.addEventListener("resize", boardController.setCanvasFullSize);
