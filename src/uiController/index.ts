import { UiBtnController } from "./UiBtnController";
import { DropdownController } from "./menu";

const switchBtn = document.getElementById(
  "menu__toggle-btn"
) as HTMLButtonElement;

const dropdown = document.getElementById("menu-dropdown") as HTMLElement;

export const switchBtnController = new UiBtnController(switchBtn);
export const dropdownController = new DropdownController(dropdown);
