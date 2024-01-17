import { ITool } from "./ITool";
import { IFile } from "./IFile";

export interface IData {
  type: string;
  elements: ITool[];
  files: Record<IFile["id"], IFile>;
}

export type { ITool as IElement, IFile };
