import { MenuBtnController } from "./MenuBtnController";

const openBtn = document.getElementById("menu__open") as HTMLButtonElement;
const saveBtn = document.getElementById("menu__save") as HTMLButtonElement;
const clearBtn = document.getElementById("menu__clear") as HTMLButtonElement;

export const openBtnController = new MenuBtnController(openBtn);
export const saveBtnController = new MenuBtnController(saveBtn);
export const clearBtnController = new MenuBtnController(clearBtn);
