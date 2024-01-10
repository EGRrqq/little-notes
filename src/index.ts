import "./style.css";

import { CanvasController } from "./canvasController";
import { MouseController, TouchController } from "./canvasController/inputs";
import { Pen } from "./canvasController/tools";

const board = document.getElementById("board") as HTMLCanvasElement;

const boardController = new CanvasController(board);

// tools = []
// inputs = []

// attach the method to modules instead of just passing it to the constructor
const pen = new Pen(boardController);
const mouseController = new MouseController(boardController, pen);
const touchController = new TouchController(boardController, pen);

window.addEventListener("load", boardController.setCanvasFullSize, {
  once: true,
});
