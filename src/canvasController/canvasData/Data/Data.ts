import { IData, IElement } from ".";

interface IDataController {
  allData: IData;

  pushElement: (element: IElement) => void;
}

export class DataController implements IData, IDataController {
  #elements: IElement[] = [];

  get elements() {
    return this.#elements;
  }

  set elements(elementsData: IElement[]) {
    this.#elements = elementsData;
  }

  pushElement(element: IElement) {
    this.#elements.push(element);
  }

  get allData(): IData {
    return {
      elements: this.elements,
    };
  }
}
