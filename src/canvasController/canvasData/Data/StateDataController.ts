import { IStrokeTool } from "../../tools/IStrokeTool";
import { IState } from "./IState";

export interface IStateDataController {
  allData: IState;
}

export class StateDataController implements IState, IStateDataController {
  #allData: IState;

  constructor(tool: IStrokeTool) {
    this.#allData = {} as IState;
    this.activeTool = tool;
  }

  get activeTool(): IState["activeTool"] {
    return this.#allData.activeTool;
  }

  set activeTool(tool: IStrokeTool) {
    const { type, settings } = tool;
    this.#allData.activeTool = {
      type,
      settings,
    };
  }

  get allData(): IState {
    return this.#allData;
  }

  set allData(data: IState) {
    this.#allData = data;
  }
}
