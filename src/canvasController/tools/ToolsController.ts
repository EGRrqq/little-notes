import { IStrokeTool } from "./IStrokeTool";

export interface ITollsController {
  tools: Record<IStrokeTool["type"], IStrokeTool>;
  activeTool: IStrokeTool;
}

export class ToolsController implements ITollsController {
  #tools: Record<IStrokeTool["type"], IStrokeTool>;
  #activeTool: IStrokeTool;

  constructor(toolList: IStrokeTool[], defaultToolType = "pen") {
    this.#tools = {};

    for (let tool of toolList) {
      this.#tools[tool.type] = tool;
    }

    this.#activeTool = this.#tools[defaultToolType];
  }

  get tools() {
    return this.#tools;
  }

  get activeTool(): IStrokeTool {
    return this.#activeTool;
  }

  set activeTool(tool: IStrokeTool) {
    this.#activeTool = tool;
  }
}
