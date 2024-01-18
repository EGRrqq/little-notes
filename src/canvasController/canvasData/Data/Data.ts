import { IData, IElement } from ".";

export class Data implements IData {
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
}
