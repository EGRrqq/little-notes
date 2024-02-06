import { UiBtnController } from "./UiBtnController";

const openBtn = document.getElementById(
  "menu__open"
) as HTMLButtonElement;

const saveBtn = document.getElementById(
  "menu__save"
) as HTMLButtonElement;

const clearBtn = document.getElementById(
  "menu__clear"
) as HTMLButtonElement;

export const openBtnController = new UiBtnController(openBtn);
export const saveBtnController = new UiBtnController(saveBtn);
export const clearBtnController = new UiBtnController(clearBtn);
