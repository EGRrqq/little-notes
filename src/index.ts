import "./style.css";

import { CanvasController } from "./canvasController";
import { MouseController, TouchController } from "./canvasController/inputs";
import { Pen, ToolsController } from "./canvasController/tools";
import {
  CacheController,
  StateController,
} from "./canvasController/canvasData/cache";
import {
  Dropdown,
  clearBtnController,
  lineCapController,
  lineJoinController,
  openBtnController,
  pickerController,
  rangeController,
  saveBtnController,
} from "./uiController";
import { loadData, saveData } from "./canvasController/canvasData/manipulate";
import { formatDate } from "./canvasController/helpers";
import { WindowData } from "./canvasController/windowData/windowDataController";

const board = document.getElementById("board") as HTMLCanvasElement;
const boardController = new CanvasController(board);
const windowData = new WindowData();

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
  const cacheController = new CacheController(
    boardController.ctx,
    toolsController
  );

  cacheController.mouseAttach();
  cacheController.touchAttach();

  const stateController = new StateController(toolsController);

  // canvas setup
  function iterateOverData() {
    for (let element of cacheController.appData.elements) {
      boardController.moveOriginPointTo(element.x, element.y);
      cacheController.iterateOverPoints(element.points, element.settings);
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
    customElements.define("canvas-dropdown", Dropdown);

    // menu
    saveBtnController.onClick(() => {
      const curDate = formatDate(new Date());

      saveData(
        cacheController.appData,
        `untitled_${curDate}.json`,
        "application/json"
      );
    });

    openBtnController.onClick(() => {
      loadData("application/json")
        .then((data) => {
          cacheController.clearDataElements();

          for (let element of data.elements) {
            cacheController.storeDataElement(element);
          }

          canvasSetup();
        })
        .catch((err) => console.error("onLoad:", err));
    });

    clearBtnController.onClick(() => {
      cacheController.clearDataElements();

      canvasSetup();
    });

    // settings
    const defaultPenColor =
      toolsController.activeTool.settings.strokeStyle.toString();
    const defaultLineWidth =
      toolsController.activeTool.settings.lineWidth.toString();
    const defaultLineCap = toolsController.activeTool.settings.lineCap;
    const defaultLineJoin = toolsController.activeTool.settings.lineJoin;

    pickerController.value = defaultPenColor;
    pickerController.onChange((e) => {
      const value = (e.target as HTMLInputElement).value;

      toolsController.activeTool.settings.strokeStyle = value;
      stateController.stateData.activeTool.settings.strokeStyle = value;
      stateController.storeDataElement();
    });

    rangeController.value = defaultLineWidth;
    rangeController.onChange((e) => {
      const value = parseInt((e.target as HTMLInputElement).value);

      toolsController.activeTool.settings.lineWidth = value;
      stateController.stateData.activeTool.settings.lineWidth = value;
      stateController.storeDataElement();
    });

    lineCapController.value = defaultLineCap;
    lineCapController.onChange((e) => {
      const value = (e.target as HTMLSelectElement).value as CanvasLineCap;

      toolsController.activeTool.settings.lineCap = value;
      stateController.stateData.activeTool.settings.lineCap = value;
      stateController.storeDataElement();
    });

    lineJoinController.value = defaultLineJoin;
    lineJoinController.onChange((e) => {
      const value = (e.target as HTMLSelectElement).value as CanvasLineJoin;

      toolsController.activeTool.settings.lineJoin = value;
      stateController.stateData.activeTool.settings.lineJoin = value;
      stateController.storeDataElement();
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
