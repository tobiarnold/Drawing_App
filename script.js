"use strict";
//Überschrift JS
let heading = document.getElementById("heading");
let text = heading.innerHTML;
let coloredText = "";
for (let i = 0; i < text.length; i++) {
  coloredText += `<span style="color: hsl(${(i * 360) / text.length}, 100%, 50%)">${text[i]}</span>`;
}
heading.innerHTML = coloredText;
// Verändern Farbe Radiergummi Button
const eraserBtn = document.getElementById('eraserBtn');
let isEraserActive = false;
function toggleEraser() {
isEraserActive = !isEraserActive;
if (isEraserActive) {
eraserBtn.classList.add('active');
context.globalCompositeOperation = 'destination-out';
} else {
eraserBtn.classList.remove('active');
context.globalCompositeOperation = 'source-over';
}
}
eraserBtn.addEventListener('click', toggleEraser);
//Drawing App
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.8;
// Default Parameter
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let lineWidth = 5;
let isErasing = false;
//Zeichen Funktion
function draw(e) {
if (!isDrawing) return;
//Radierer
if (isErasing) {
context.globalCompositeOperation = "destination-out";
context.strokeStyle = "rgba(0,0,0,1)";
context.lineWidth = 20;
//Zeichnen
} else {
context.globalCompositeOperation = "source-over";
context.strokeStyle = document.getElementById("colorpicker").value;
context.lineWidth = lineWidth;
}
context.lineCap = "round";
context.lineJoin = "round";
context.beginPath();
context.moveTo(lastX, lastY);
context.lineTo(e.pageX || e.touches[0].pageX, e.pageY || e.touches[0].pageY);
context.stroke();
[lastX, lastY] = [e.pageX || e.touches[0].pageX, e.pageY || e.touches[0].pageY];
hue++;
}
//Mousedown / Touchstart
canvas.addEventListener("mousedown", (e) => {
isDrawing = true;
[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("touchstart", (e) => {
isDrawing = true;
[lastX, lastY] = [e.touches[0].pageX, e.touches[0].pageY];
});
//Mousemove / Touchmove
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", draw);
//Mouseup / Touchend
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("touchend", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
//Liniendicke
document.getElementById("lineWidth").addEventListener("change", (e) => {
lineWidth = e.target.value;
});
//Radierer
document.getElementById("eraserBtn").addEventListener("click", () => {
isErasing = !isErasing;
});
//Bild downloaden
const saveButton = document.getElementById('save-button');
const downloadLink = document.getElementById('download-link');
saveButton.addEventListener('click', () => {
downloadLink.href = canvas.toDataURL();
downloadLink.click();
});
