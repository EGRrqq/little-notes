import { IData, IElement } from ".";

interface IAllData {
  allData: IData;
}

export class Data implements IData, IAllData {
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
