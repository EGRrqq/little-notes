import { IData } from "../Data";
import { TContentType } from "./TContentType";

type TSaveData = (
  data: IData,
  filename: string,
  contentType: TContentType
) => void;

export const saveData: TSaveData = (data, filename, contentType) => {
  fetch(objToUrl(data, contentType))
    .then((res) => {
      const a = createAnchor(res.url, filename);
      a.click();

      return res.url;
    })
    .then((url) => removeObjUrl(url))
    .catch((err) => console.error("onSave:", err));
};

function createAnchor(url: string, filename: string): HTMLAnchorElement {
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;

  return a;
}

function objToUrl(data: IData, contentType: TContentType): string {
  const dataBlob = new Blob([JSON.stringify(data, null, 2)], {
    type: contentType,
  });

  const dataUrl = URL.createObjectURL(dataBlob);

  return dataUrl;
}

function removeObjUrl(url: string) {
  URL.revokeObjectURL(url);
}
