"use strict";
const boardContainer = document.querySelector(".board-container");
const inputSize = document.querySelector("#input-size");
const inputColor = document.querySelector("#input-color");
const randomColor = document.querySelector("#circle-random-colors");
const formSize = document.querySelector(".form-size");
const labelFormColor = document.querySelector("#user-color-label");
const labelRandomColor = document.querySelector("#random-color-label");
class App {
  get #RANDOM_COLOR() {
    return "random";
  }
  #currentColor;
  constructor() {
    this.#currentColor = this.#RANDOM_COLOR;
    inputSize.addEventListener(
      "input",
      function (e) {
        const dimension = +inputSize.value;
        document.querySelector(
          ".form-size label"
        ).textContent = `Size: ${dimension}x${dimension}`;
        this.#createBoard();
      }.bind(this)
    );

    inputColor.addEventListener(
      "input",
      function (e) {
        labelFormColor.classList.add("chosen-color");
        labelRandomColor.classList.remove("chosen-color");
        this.#currentColor = inputColor.value;
        console.log(this.#currentColor);
        this.#updateBrushColor(this.#currentColor);
      }.bind(this)
    );

    randomColor.addEventListener(
      "click",
      function (e) {
        labelRandomColor.classList.add("chosen-color");
        labelFormColor.classList.remove("chosen-color");
        this.#currentColor = this.#RANDOM_COLOR;
        this.#updateBrushColor();
      }.bind(this)
    );

    this.#createBoard();
  }
  get #getCurrentColor() {
    if (this.#currentColor === this.#RANDOM_COLOR) {
      return `${this.#getRandomColor()}`;
    }
    console.log("getter", this);
    return this.#currentColor;
  }

  #getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  #createBoard = function () {
    this.#cleanBoard();
    const dimension = +inputSize.value;
    for (let i = 0; i < dimension; i++) {
      const row = this.#createRowElement();
      for (let j = 0; j < dimension; j++) {
        row.append(this.#createCell());
      }
      boardContainer.appendChild(row);
    }
  };

  #createRowElement() {
    const row = document.createElement("div");
    row.classList.add("board-row");
    return row;
  }

  #createCell() {
    const column = document.createElement("div");
    column.addEventListener(
      "mouseenter",
      function (e) {
        console.log(this);
        console.log(`${this.#currentColor}`);
        e.target.style["background-color"] = `${this.#getCurrentColor}`;
      }.bind(this)
    );
    column.classList.add("board-column");
    return column;
  }

  #cleanBoard() {
    return (boardContainer.innerHTML = "");
  }

  #updateBrushColor() {
    const cells = [...document.querySelectorAll(".board-column")];
    cells.forEach((cell) =>
      cell.addEventListener("mouseenter", function (e) {
        e.target.style["background-color"] = this.#currentColor;
      })
    );
  }
}

const app = new App();
