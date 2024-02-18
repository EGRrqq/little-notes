import { StateDataController } from "../Data/StateDataController";
import { ToolsController } from "../../tools";

interface IStateController {}

export class StateController implements IStateController {
  #stateDataController: StateDataController;
  #toolsController: ToolsController;

  #storageStateKey = "LN-state";

  constructor(toolsController: ToolsController) {
    this.#toolsController = toolsController;
    this.#stateDataController = new StateDataController(
      this.#toolsController.activeTool
    );

    if (this.#restoreDataElements()) {
      const { type, settings } = this.#stateDataController.activeTool;

      this.#toolsController.activeTool = type;
      this.#toolsController.activeTool.settings = settings;
    }

    this.storeDataElement();
  }

  get stateData() {
    return this.#stateDataController.allData;
  }

  storeDataElement() {
    localStorage.setItem(
      this.#storageStateKey,
      JSON.stringify(this.#stateDataController.allData)
    );
  }

  #restoreDataElements(): boolean {
    const storageData = localStorage.getItem(this.#storageStateKey);

    if (storageData) {
      this.#stateDataController.allData = JSON.parse(storageData);
      return true;
    }

    return false;
  }
}
