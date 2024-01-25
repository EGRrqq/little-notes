import { IWindowData } from "./IWindowData";

export class WindowData implements IWindowData {
  get dpr() {
    return window.devicePixelRatio;
  }

  get innerHeight() {
    return window.innerHeight;
  }

  get innerWidth() {
    return window.innerWidth;
  }
}
