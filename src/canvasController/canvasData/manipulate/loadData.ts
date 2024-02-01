import { IData } from "../Data";
import { TContentType } from "./TContentType";

export function loadData(type: TContentType): Promise<IData> {
  return new Promise((res, rej) => {
    const input = createInput(type);

    input.onchange = () => {
      const file = input.files?.[0];

      if (file) readData(file).then(res).catch(rej);
    };

    input.click();
  });
}

function readData(file: File): Promise<IData> {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.onerror = rej;
    reader.onload = () => {
      const data = JSON.parse(reader.result as string);
      res(data);
    };
    reader.readAsText(file);
  });
}

function createInput(type: TContentType): HTMLInputElement {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = type;

  return input;
}
