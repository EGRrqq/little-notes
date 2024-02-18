import { SettingsItemController } from "./SettingsItemController";

const picker = document.getElementById("settings_picker") as HTMLInputElement;
const range = document.getElementById("settings_range") as HTMLInputElement;
const lineCap = document.getElementById(
  "settings_line-cap"
) as HTMLSelectElement;
const lineJoin = document.getElementById(
  "settings_line-join"
) as HTMLSelectElement;

export const pickerController = new SettingsItemController(picker);
export const rangeController = new SettingsItemController(range);
export const lineCapController = new SettingsItemController(lineCap);
export const lineJoinController = new SettingsItemController(lineJoin);
