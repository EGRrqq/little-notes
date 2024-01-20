import { IData } from "../Data";

export function loadData(callback: (data: IData) => void) {
  const input = document.createElement("input");

  input.type = "file";
  input.accept = "application/json";
  input.addEventListener("change", (e) => inputOnChange(e, callback), {
    once: true,
  });
  input.click();

  input.remove();
}

function inputOnChange(e: Event, callback: (data: IData) => void) {
  const inputFile = (e.target as HTMLInputElement).files?.[0];

  if (inputFile) {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", (e) => readerOnLoad(e, callback), {
      once: true,
    });

    fileReader.readAsText(inputFile);
  }
}

function readerOnLoad(e: Event, callback: (data: IData) => void) {
  const data: IData = JSON.parse((e.target as FileReader).result as string);

  callback(data);
}
