// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;

let svg = document.querySelector("svg");
let box = document.querySelector("rect");
let currentLine;

const ns = "http://www.w3.org/2000/svg";

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
box.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;

  currentLine = document.createElementNS(ns, "line");
  currentLine.setAttribute("x1", x);
  currentLine.setAttribute("y1", y);
  currentLine.setAttribute("x2", x);
  currentLine.setAttribute("y2", y);
  currentLine.setAttribute("stroke", "black");
  currentLine.setAttribute("stroke-width", "2");

  svg.appendChild(currentLine);
});

box.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    drawLine(e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener("mouseup", (e) => {
  if (isDrawing) {
    drawLine(e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawLine(x2, y2) {
    let rect = box.getBoundingClientRect();
    let x = x2 - rect.left;
    let y = y2 - rect.top;

    // Make sure the line stays within the box
    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    currentLine.setAttribute("x2", x);
    currentLine.setAttribute("y2", y);
}
