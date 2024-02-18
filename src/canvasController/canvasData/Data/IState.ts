import { IStrokeTool } from "../../tools/IStrokeTool";

export interface IState {
  activeTool: Pick<IStrokeTool, "type" | "settings">;
}
