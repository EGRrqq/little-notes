interface IPointerData {
  getPrevValues(): [number, number];
  setPrevValues(x: number, y: number): void;
}

class PointerData implements IPointerData {
  #prevX = 0;
  #prevY = 0;
  #pressed = false;

  get pressed() {
    return this.#pressed;
  }

  set pressed(flag: boolean) {
    this.#pressed = flag;
  }

  getPrevValues(): [number, number] {
    return [this.#prevX, this.#prevY];
  }

  setPrevValues(x: number, y: number) {
    this.#prevX = x;
    this.#prevY = y;
  }
}

export const pointerData = new PointerData();
