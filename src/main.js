// config
const SIZE = 500;
const CELL_SIZE = 10;
const rows = SIZE / CELL_SIZE;
const cols = SIZE / CELL_SIZE;

const BG_COLOR = "#242424";
const COLOR_LIVE = "#ffffff";
const DEAD_COLOR = BG_COLOR;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");

canvas.width = SIZE;
canvas.height = SIZE;

// models
class Cell {
  constructor(x, y, size, isLive) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.isLive = isLive;
  }

  draw() {
    ctx.fillStyle = this.isLive ? COLOR_LIVE : DEAD_COLOR;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.strokeStyle = this.isLive ? null : "grey";
    ctx.strokeRect(this.x, this.y, this.size, this.size);
    return this;
  }

  setIsLive(value) {
    this.isLive = value;
  }

  toggleLive() {
    this.isLive = !this.isLive;
    return this;
  }
}

class CellBuilder {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = CELL_SIZE;
    this.isLive = false;
  }
  setX(x) {
    this.x = x;
    return this;
  }
  setY(y) {
    this.y = y;
    return this;
  }
  setSize(size) {
    this.size = size;
    return this;
  }
  setIsLive(isLive) {
    this.isLive = isLive;
    return this;
  }
  build() {
    return new Cell(this.x, this.y, this.size, this.isLive);
  }
}

class GameState {
  constructor() {
    this.start = false;
    this.generation = 0;
  }
  setStart(value) {
    this.start = value;
  }
  setGeneration(value) {
    this.generation = value;
  }
}

// functions
function drawBackground(color = BG_COLOR) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function initCells() {
  const cellsArray = [];

  for (let x = 0; x < SIZE; x += CELL_SIZE) {
    for (let y = 0; y < SIZE; y += CELL_SIZE) {
      cellsArray.push(
        new CellBuilder().setX(x).setY(y).setIsLive(false).build().draw(),
      );
    }
  }
  return cellsArray;
}

function drawCells(array = []) {
  array.forEach((cell) => {
    cell.draw();
  });
}

const toggleClickCell = (e) => {
  if (game.start) return;
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
  const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    const index = x * cols + y;
    cells[index].toggleLive().draw();
    console.log(x, y);
    console.log(index);
  }
};

const game = new GameState();
let cells = initCells();

canvas.addEventListener("click", toggleClickCell);

startBtn.addEventListener("click", () => {
  game.setStart(true);
  startBtn.classList.add("active");
  pauseBtn.classList.remove("active");
});

pauseBtn.addEventListener("click", () => {
  game.setStart(false);
  pauseBtn.classList.add("active");
  startBtn.classList.remove("active");
});

// function loopGeneration() {
//   if (!game.start) {
//     window.requestAnimationFrame(loopGeneration);
//     return;
//   }
//   console.log("loop");
//   const cellsAux = initCells();
//   for (let x = 0; x < cols; x++) {
//     for (let y = 0; y < rows; y++) {
//       let countLiving = 0;
//       if (x > 0 && x < cols - 1 && y > 0 && y < rows - 1) {
//         const index = x * cols + y;
//         if (cells[index - 1].isLive) countLiving++;
//         if (cells[index - 2].isLive) countLiving++;
//         if (cells[index - 3].isLive) countLiving++;
//         if (cells[index - 4].isLive) countLiving++;
//         if (cells[index + 1].isLive) countLiving++;
//         if (cells[index + 2].isLive) countLiving++;
//         if (cells[index + 3].isLive) countLiving++;
//         if (cells[index + 4].isLive) countLiving++;
//         if (countLiving > 2) cellsAux[index].setIsLive(true);
//         else cellsAux[index].setIsLive(false);
//       }
//     }
//   }
//   drawBackground();
//   cells = cellsAux;
//   drawCells(cells);
//   setTimeout(() => window.requestAnimationFrame(loopGeneration), 20);
// }

function loopGeneration() {
  if (!game.start) {
    window.requestAnimationFrame(loopGeneration);
    return;
  }
  const cellsAux = [];
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const index = x * cols + y;
      let countLiving = 0;
      // Contar vecinos vivos
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
            const nIndex = nx * cols + ny;
            if (cells[nIndex].isLive) countLiving++;
          }
        }
      }
      // Reglas de Conway
      const isLive = cells[index].isLive;
      let nextLive = isLive;
      if (isLive && (countLiving < 2 || countLiving > 3)) nextLive = false;
      if (!isLive && countLiving === 3) nextLive = true;
      cellsAux.push(
        new CellBuilder()
          .setX(x * CELL_SIZE)
          .setY(y * CELL_SIZE)
          .setIsLive(nextLive)
          .build(),
      );
    }
  }
  drawBackground();
  cells = cellsAux;
  drawCells(cells);
  setTimeout(() => window.requestAnimationFrame(loopGeneration), 20);
}

loopGeneration();
