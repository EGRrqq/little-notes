interface ISettingsItemController {
  value: string;
  onChange(callback: (e: Event) => void): void;
}

export class SettingsItemController implements ISettingsItemController {
  #settingsItem: HTMLInputElement | HTMLSelectElement;

  constructor(element: HTMLInputElement | HTMLSelectElement) {
    this.#settingsItem = element;
  }

  get #element() {
    return this.#settingsItem;
  }

  set value(value: string) {
    this.#element.value = value;
  }

  onChange(callback: (e: Event) => void) {
    this.#element.addEventListener("change", (e) => callback(e));
  }
}
