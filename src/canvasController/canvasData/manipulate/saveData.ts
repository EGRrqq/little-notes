import { IData } from "../Data";

export function saveData(data: IData, filename: string) {
  const dataBlob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const dataUrl = URL.createObjectURL(dataBlob);
  const a = document.createElement("a");

  a.href = dataUrl;
  a.download = `${filename}.json`;
  a.click();

  URL.revokeObjectURL(dataUrl);
  a.remove();
}
