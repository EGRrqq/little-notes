interface ICustomElement {
  _internals: ElementInternals;

  connectedCallback: () => void;
  disconnectedCallback: () => void;
  adoptedCallback: () => void;
  attributeChangedCallback: (
    name: observedAttributes,
    oldValue: string,
    newValue: string
  ) => void;
}

type observedAttributes = "isopen";

export class Dropdown extends HTMLElement implements Partial<ICustomElement> {
  static observedAttributes: observedAttributes[] = ["isopen"];

  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const template = document.getElementById("dropdown") as HTMLTemplateElement;

    const style = new CSSStyleSheet();
    style.replaceSync(`
      :host {
        position: absolute;

        margin: var(--content-padding) !important;
      }

      #dropdown__section {
        display: grid;

        margin-top: calc(var(--content-padding) / 2);
      }

      .dropdown--onTop {
        position: relative;
        z-index: 1;
      }

      .dropdown--isClosed {
      display: none !important;
      }
    `);

    shadow.appendChild(template?.content.cloneNode(true));
    shadow.adoptedStyleSheets = [style];

    this.dropdownBtn.classList.add("dropdown--onTop");
    this.dropdownBtn.addEventListener("click", this.toggleIsOpen);

    this.dropdownSection.classList.add("dropdown--onTop");
    this.dropdownSection.classList.add("dropdown--isClosed");
    this.dropdownSection.ariaHidden = "true";
  }

  attributeChangedCallback(
    //@ts-ignore
    name: observedAttributes,
    oldValue: string,
    newValue: string
  ): void {
    if (!oldValue) return;

    switch (newValue) {
      case "true":
        this.dropdownSection.classList.remove("dropdown--isClosed");
        this.dropdownSection.ariaHidden = "false";
        break;
      case "false":
        this.dropdownSection.classList.add("dropdown--isClosed");
        this.dropdownSection.ariaHidden = "true";
        break;
      default:
        break;
    }
  }

  disconnectedCallback() {
    this.dropdownBtn.removeEventListener("click", this.toggleIsOpen);
  }

  toggleIsOpen = () => {
    switch (this.getAttribute("isopen")) {
      case "true":
        this.setAttribute("isopen", "false");
        break;
      case "false":
        this.setAttribute("isopen", "true");
        break;
      default:
        break;
    }
  };

  get dropdownBtn() {
    return this.shadowRoot?.getElementById(
      "dropdown__btn"
    ) as HTMLButtonElement;
  }

  get dropdownSection() {
    return this.shadowRoot?.getElementById("dropdown__section") as HTMLElement;
  }
}
