import "./style.css";

import { CanvasController } from "./canvasController";
import { MouseController, TouchController } from "./canvasController/inputs";
import { Pen } from "./canvasController/tools";
import { CacheController } from "./canvasController/features";

const board = document.getElementById("board") as HTMLCanvasElement;

const boardController = new CanvasController(board);

// inputs = []
const mouseController = new MouseController(boardController);
const touchController = new TouchController(boardController);

mouseController.attach();
touchController.attach();

const cacheController = new CacheController(boardController);
cacheController.mouseAttach();
cacheController.touchAttach();

// tools = []
const pen = new Pen(boardController);
boardController.selectTool = pen;

window.addEventListener("load", boardController.setCanvasFullSize, {
  once: true,
});

window.addEventListener("resize", boardController.setCanvasFullSize);
