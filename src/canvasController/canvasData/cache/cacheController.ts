import { ITollsController } from "../../tools";
import { Data, ElementData } from "../Data";

export interface ICacheController {
  mouseAttach(): void;
  touchAttach(): void;
}

export class CacheController implements ICacheController {
  #captureFlag = false;

  #appData = new Data();
  #storageDataKey = "LittleNotes";

  #toolCache = new ElementData();
  #toolsController: ITollsController;

  constructor(toolsController: ITollsController) {
    this.#toolsController = toolsController;

    const storageData = localStorage.getItem(this.#storageDataKey);

    if (storageData) {
      this.#appData.elements = JSON.parse(storageData);
    }
  }

  mouseAttach(): void {
    window.addEventListener("mousedown", (e: MouseEvent) =>
      this.#onPointerDown(e.clientX, e.clientY)
    );

    window.addEventListener("mousemove", (e: MouseEvent) =>
      this.#onPointerMove(e.clientX, e.clientY)
    );

    window.addEventListener("mouseup", () => this.#onPointerUp());
  }

  touchAttach(): void {
    window.addEventListener("touchstart", (e: TouchEvent) =>
      this.#onPointerDown(
        Math.round(e.touches[0].clientX),
        Math.round(e.touches[0].clientY)
      )
    );

    window.addEventListener("touchmove", (e: TouchEvent) =>
      this.#onPointerMove(
        Math.round(e.touches[0].clientX),
        Math.round(e.touches[0].clientY)
      )
    );

    window.addEventListener("touchend", () => this.#onPointerUp());
  }

  get #dataKey() {
    return this.#storageDataKey;
  }

  get #data() {
    return this.#appData;
  }

  get #cache() {
    return this.#toolCache;
  }

  set #cache(data: ElementData) {
    this.#toolCache = data;
  }

  #onPointerDown = (x: number, y: number) => {
    this.#captureFlag = true;

    this.#cache = new ElementData();

    this.#cache.type = this.#toolsController.selectedTool.type;

    // set up origin point
    // to calculate points from new origin point
    this.#cache.x = x;
    this.#cache.y = y;

    // first coord, basically onMouseDown coord
    this.#cache.point = [0, 0];
  };

  #onPointerMove = (x: number, y: number) => {
    if (this.#captureFlag) {
      this.#cache.point = [x - this.#cache.x, y - this.#cache.y];
      this.#cache.lastPoint = [x - this.#cache.x, y - this.#cache.y];
    }
  };

  #onPointerUp = () => {
    this.#captureFlag = false;

    this.#data.pushElement(this.#cache.elementData);
    localStorage.setItem(this.#dataKey, JSON.stringify(this.#data.elements));

    // set width/height

    console.log(this.#data.elements);
    console.log(this.#cache.elementData);
    console.log("--------------");
  };

  // requestAnimationFrame(redraw)
}
