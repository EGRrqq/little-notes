import { SettingsItemController } from "./SettingsItemController";

const picker = document.getElementById("settings_picker") as HTMLInputElement;
const range = document.getElementById("settings_range") as HTMLInputElement;

export const pickerController = new SettingsItemController(picker);
export const rangeController = new SettingsItemController(range);
