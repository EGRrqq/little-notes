import { IElement } from "./IElement";
import { IFile } from "./IFile";

export interface IData {
  elements: IElement[];
  files?: Record<IFile["id"], IFile>;
}
