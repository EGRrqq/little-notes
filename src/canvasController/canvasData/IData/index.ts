import { IElement } from "./IElement";
import { IFile } from "./IFile";

export interface IData {
  type: string;
  elements: IElement[];
  files: Record<IFile["id"], IFile>;
}

export type { IElement, IFile };
