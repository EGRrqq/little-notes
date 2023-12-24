import "./style.css";

window.addEventListener("load", setCanvasFullSize, { once: true });

const canvas = document.getElementById("board") as HTMLCanvasElement;

const ctx = canvas.getContext("2d");

let prevX: number;
let prevY: number;
let pressed = false;

canvas.addEventListener("mousemove", (e) => {
  if (pressed) {
    pen(e.clientX, e.clientY);
  }
});

canvas.addEventListener("mousedown", (e) => {
  pressed = true;

  prevX = e.clientX;
  prevY = e.clientY;
});

canvas.addEventListener("mouseup", () => {
  pressed = false;
});

function pen(curX: number, curY: number) {
  if (ctx) {
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(curX, curY);
    ctx.closePath();
    ctx.stroke();

    prevX = curX;
    prevY = curY;
  }
}

function setCanvasFullSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
