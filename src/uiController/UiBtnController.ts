interface IUiBtnController {
  onClick(callback: () => void): void;
}

export class UiBtnController implements IUiBtnController {
  #canvasBtn: HTMLButtonElement;

  constructor(btn: HTMLButtonElement) {
    this.#canvasBtn = btn;
  }

  get #btn() {
    return this.#canvasBtn;
  }

  onClick(callback: () => void) {
    this.#btn.addEventListener("click", () => callback());
  }
}
