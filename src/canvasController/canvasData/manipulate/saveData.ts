import { IData } from "../Data";
import { TContentType } from "./TContentType";

type TSaveData = (
  data: IData,
  filename: string,
  contentType: TContentType
) => void;

export const saveData: TSaveData = (data, filename, contentType) => {
  const dataBlob = new Blob([JSON.stringify(data, null, 2)], {
    type: contentType,
  });
  const dataUrl = URL.createObjectURL(dataBlob);
  const a = document.createElement("a");

  a.href = dataUrl;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(dataUrl);
  a.remove();
};
