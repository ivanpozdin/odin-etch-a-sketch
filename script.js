"use strict";

const RANDOM_COLOR = "random";
const boardContainer = document.querySelector(".board-container");
const inputSize = document.querySelector("#input-size");
const inputColor = document.querySelector("#input-color");
const randomColor = document.querySelector("#circle-random-colors");
const formSize = document.querySelector(".form-size");
const labelFormColor = document.querySelector("#user-color-label");
const labelRandomColor = document.querySelector("#random-color-label");
let currentColor = RANDOM_COLOR;

const getColor = function () {
  if (currentColor === RANDOM_COLOR) {
    return `${getRandomColor()}`;
  }
  return currentColor;
};

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const createBoard = function () {
  const cleanBoard = () => (boardContainer.innerHTML = "");

  const createRowElement = function () {
    const row = document.createElement("div");
    row.classList.add("board-row");
    return row;
  };

  const createCell = function () {
    const column = document.createElement("div");
    column.addEventListener("mouseenter", function (e) {
      e.target.style["background-color"] = `${getColor()}`;
    });
    column.classList.add("board-column");
    return column;
  };

  cleanBoard();
  const dimension = +inputSize.value;

  for (let i = 0; i < dimension; i++) {
    const row = createRowElement();
    for (let j = 0; j < dimension; j++) {
      row.append(createCell());
    }
    boardContainer.appendChild(row);
  }
};

const changeBrushColor = function (color) {
  const cells = [...document.querySelectorAll(".board-column")];
  cells.forEach((cell) =>
    cell.addEventListener("mouseenter", function (e) {
      e.target.style["background-color"] = color;
    })
  );
};

inputSize.addEventListener("input", function (e) {
  const dimension = +inputSize.value;
  document.querySelector(
    ".form-size label"
  ).textContent = `Size: ${dimension}x${dimension}`;
  createBoard();
});

inputColor.addEventListener("input", function (e) {
  labelFormColor.classList.add("chosen-color");
  labelRandomColor.classList.remove("chosen-color");
  const currentColor = inputColor.value;
  changeBrushColor(currentColor);
});

randomColor.addEventListener("click", function (e) {
  labelRandomColor.classList.add("chosen-color");
  labelFormColor.classList.remove("chosen-color");
  const currentColor = RANDOM_COLOR;
  changeBrushColor(currentColor);
});

createBoard();
