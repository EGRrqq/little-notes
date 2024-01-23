import { UiBtnController } from "./UiBtnController";
import { DropdownController } from "./menu";

const switchBtn = document.getElementById(
  "menu__toggle-btn"
) as HTMLButtonElement;

const openBtn = document.getElementById(
  "menu-dropdown__open"
) as HTMLButtonElement;

const saveBtn = document.getElementById(
  "menu-dropdown__save"
) as HTMLButtonElement;

const dropdown = document.getElementById("menu-dropdown") as HTMLElement;

export const switchBtnController = new UiBtnController(switchBtn);

export const dropdownController = new DropdownController(dropdown);
export const openBtnController = new UiBtnController(openBtn);
export const saveBtnController = new UiBtnController(saveBtn);
