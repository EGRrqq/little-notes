import { IData } from "../Data";
import { TContentType } from "./TContentType";

type TLoadData = (callback: TCallback, contentType: TContentType) => void;
type TCallback = (data: IData) => void;

export const loadData: TLoadData = (callback, contentType) => {
  const input = document.createElement("input");

  input.type = "file";
  input.accept = contentType;
  input.addEventListener("change", (e) => inputOnChange(e, callback), {
    once: true,
  });
  input.click();

  input.remove();
};

function inputOnChange(e: Event, callback: TCallback) {
  const inputFile = (e.target as HTMLInputElement).files?.[0];

  if (inputFile) {
    const fileReader = new FileReader();

    fileReader.addEventListener("load", (e) => readerOnLoad(e, callback), {
      once: true,
    });
    fileReader.readAsText(inputFile);
  }
}

function readerOnLoad(e: Event, callback: TCallback) {
  const data: IData = JSON.parse((e.target as FileReader).result as string);

  callback(data);
}
