import "./style.css";

import { CanvasController } from "./canvasController";
import { MouseController, TouchController } from "./canvasController/inputs";
import { Pen, ToolsController } from "./canvasController/tools";
import { CacheController } from "./canvasController/canvasData/cache";
import { dropdownController, switchBtnController } from "./uiController";

const board = document.getElementById("board") as HTMLCanvasElement;
const boardController = new CanvasController(board);

const toggleClass = "menu-dropdown--isClosed";

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

  // canvas setup
  function iterateOverData() {
    for (let element of cacheController.data.elements) {
      boardController.moveOriginPointTo(element.x, element.y);
      cacheController.iterateOverPoints(element.points);
      boardController.resetOriginPoint();
    }
  }

  function canvasSetup() {
    boardController.setCanvasFullSize();
    boardController.clearCanvasData();

    requestAnimationFrame(iterateOverData);
  }

  // ui setup
  function uiSetup() {
    switchBtnController.onClick(() => {
      dropdownController.toggleIsOpen();
      dropdownController.toggleClass(toggleClass);
    });
  }

  window.addEventListener("resize", canvasSetup);

  window.addEventListener("load", canvasSetup, {
    once: true,
  });

  window.addEventListener("load", uiSetup, {
    once: true,
  });
}
