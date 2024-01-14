import { ITool } from "./ITool";

export interface ITollsController {
  tools: Record<ITool["type"], ITool>;
  selectedTool: ITool;
}

export class ToolsController implements ITollsController {
  #tools: Record<ITool["type"], ITool>;
  #selectedTool: ITool;

  constructor(toolsList: ITool[], defaultToolType = "pen") {
    this.#tools = {};

    for (let tool of toolsList) {
      this.#tools[tool.type] = tool;
    }

    this.#selectedTool = this.#tools[defaultToolType];
  }

  get tools() {
    return this.#tools;
  }

  get selectedTool(): ITool {
    return this.#selectedTool;
  }

  set selectedTool(tool: ITool) {
    this.#selectedTool = tool;
  }
}
