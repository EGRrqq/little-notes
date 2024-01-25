import "./style.css";

import { CanvasController } from "./canvasController";
import { MouseController, TouchController } from "./canvasController/inputs";
import { Pen, ToolsController } from "./canvasController/tools";
import { CacheController } from "./canvasController/canvasData/cache";
import {
  clearBtnController,
  dropdownController,
  openBtnController,
  saveBtnController,
  switchBtnController,
} from "./uiController";
import { loadData, saveData } from "./canvasController/canvasData/manipulate";
import { formatDate } from "./canvasController/helpers";
import { WindowData } from "./canvasController/windowData/windowDataController";

const board = document.getElementById("board") as HTMLCanvasElement;
const boardController = new CanvasController(board);
const windowData = new WindowData();

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

  cacheController.mouseAttach(board);
  cacheController.touchAttach(board);

  // canvas setup
  function iterateOverData() {
    for (let element of cacheController.appData.elements) {
      boardController.moveOriginPointTo(element.x, element.y);
      cacheController.iterateOverPoints(element.points);
      boardController.resetOriginPoint(windowData.dpr);
    }
  }

  function canvasSetup() {
    boardController.setCanvasFullSize(
      windowData.innerWidth,
      windowData.innerHeight,
      windowData.dpr
    );
    boardController.clearCanvasData();

    requestAnimationFrame(iterateOverData);
  }

  // ui setup
  function uiSetup() {
    switchBtnController.onClick(() => {
      dropdownController.toggleIsOpen();
      dropdownController.toggleClass(toggleClass);
    });

    saveBtnController.onClick(() => {
      const curDate = formatDate(new Date());

      saveData(
        cacheController.appData,
        `untitled_${curDate}.json`,
        "application/json"
      );
    });

    openBtnController.onClick(() =>
      loadData((data) => {
        cacheController.clearDataElements();

        for (let element of data.elements) {
          cacheController.storeDataElement(element);
        }

        canvasSetup();
      }, "application/json")
    );

    clearBtnController.onClick(() => {
      cacheController.clearDataElements();

      canvasSetup();
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
