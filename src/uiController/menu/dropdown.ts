interface IDropdown {
  toggleIsOpen: () => void;
  toggleClass: (cssClass: string) => void;
}

export class DropdownController implements IDropdown {
  #dropdownEl: HTMLElement;
  #isOpen: "true" | "false";

  constructor(dropdownEl: HTMLElement) {
    this.#dropdownEl = dropdownEl;

    this.#isOpen = "false";
    this.#dropdownEl.dataset.isOpen = this.#isOpen;
  }

  toggleIsOpen() {
    switch (this.#isOpen) {
      case "true":
        this.#isOpen = "false";
        this.#dropdownEl.dataset.isOpen = this.#isOpen;
        break;
      case "false":
        this.#isOpen = "true";
        this.#dropdownEl.dataset.isOpen = this.#isOpen;
        break;
      default:
        break;
    }
  }

  toggleClass(cssClass: string) {
    switch (this.#isOpen) {
      case "true":
        this.#dropdownEl.classList.remove(cssClass);
        break;
      case "false":
        this.#dropdownEl.classList.add(cssClass);
        break;
      default:
        break;
    }
  }
}
