import { ITool } from "./ITool";

export interface ITollsController {
  tools: Record<ITool["type"], ITool>;
  activeTool: ITool;
}

export class ToolsController implements ITollsController {
  #tools: Record<ITool["type"], ITool>;
  #activeTool: ITool;

  constructor(toolList: ITool[], defaultToolType = "pen") {
    this.#tools = {};

    for (let tool of toolList) {
      this.#tools[tool.type] = tool;
    }

    this.#activeTool = this.#tools[defaultToolType];
  }

  get tools() {
    return this.#tools;
  }

  get activeTool(): ITool {
    return this.#activeTool;
  }

  set activeTool(tool: ITool) {
    this.#activeTool = tool;
  }
}
