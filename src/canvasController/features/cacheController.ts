import { CanvasController } from "..";

interface ICacheController {
  mouseAttach(): void;
  touchAttach(): void;
}

export class CacheController implements ICacheController {
  #blobURL = "";
  #blobImg = new Image();
  #canvasController: CanvasController;

  constructor(canvasController: CanvasController) {
    this.#canvasController = canvasController;

    this.#blobImg.addEventListener("load", this.#onBlobImageLoad);

    window.addEventListener("resize", this.#onWindowResize);
  }

  mouseAttach() {
    this.#canvasController.canvas.addEventListener(
      "mouseup",
      this.#onPointerUp
    );
  }

  touchAttach() {
    this.#canvasController.canvas.addEventListener(
      "touchend",
      this.#onPointerUp
    );
  }

  #setBlobURL(canvas: HTMLCanvasElement) {
    // canvas.toDataUrl() base64-encoded string, but sync
    // canvas.toBlob() less memory-intensive + async
    canvas.toBlob((blob) => {
      if (blob) {
        this.#blobURL = URL.createObjectURL(blob);
      }
    });
  }

  #onWindowResize = () => {
    this.#blobImg.src = this.#blobURL;
  };

  #onBlobImageLoad = () => {
    this.#canvasController.ctx?.drawImage(this.#blobImg, 0, 0);
  };

  #onPointerUp = () => {
    this.#setBlobURL(this.#canvasController.canvas);
  };
}
