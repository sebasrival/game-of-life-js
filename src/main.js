import { WSIZE, HSIZE } from "./config";
import { GameState } from "./models";
import { theme } from "./theme";
import {
  initBoard,
  toggleClickCell,
  drawCells,
  loopGame,
  drawBackground,
  drawGrid,
} from "./lib";

const canvas = document.getElementById("canvas");
const canvasGrid = document.getElementById("canvas_grid");
const ctx = canvas.getContext("2d");
const ctxGrid = canvasGrid.getContext("2d");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const gridBtn = document.getElementById("gridBtn");
const toggleMode = document.getElementById("toggleModeBtn");
const containerElementCanvas = document.querySelector(".container_canvas");

function main() {
  let scale = 5;

  containerElementCanvas.style.width = WSIZE;
  containerElementCanvas.style.height = HSIZE;

  canvas.width = WSIZE * scale;
  canvas.height = HSIZE * scale;

  canvasGrid.width = WSIZE * scale;
  canvasGrid.height = HSIZE * scale;

  canvas.style.width = `${WSIZE}px`;
  canvas.style.height = `${HSIZE}px`;

  canvasGrid.style.width = `${WSIZE}px`;
  canvasGrid.style.height = `${HSIZE}px`;

  ctx.scale(scale, scale);
  ctxGrid.scale(scale, scale);

  const game = new GameState();

  console.log(game.generation);
  console.log(game.population);

  const cellsBoard = initBoard();
  const nextCellsBoard = initBoard();

  drawCells(ctx, cellsBoard);
  drawGrid(ctxGrid);

  canvas.addEventListener("click", (e) =>
    toggleClickCell(ctx, e, game, cellsBoard),
  );

  startBtn.addEventListener("click", () => {
    if (game.state === "start") return;
    game.setState("start");
    startBtn.classList.add("active");
    pauseBtn.classList.remove("active");
    loopGame(ctx, cellsBoard, nextCellsBoard, game);
  });

  pauseBtn.addEventListener("click", () => {
    game.setState("pause");
    pauseBtn.classList.add("active");
    startBtn.classList.remove("active");
  });

  resetBtn.addEventListener("click", () => {
    game.setState("reset");
    startBtn.classList.remove("active");
    pauseBtn.classList.remove("active");
    game.setState("idle");
    cellsBoard.length = 0;
    cellsBoard.push(...initBoard());
    nextCellsBoard.length = 0;
    nextCellsBoard.push(...initBoard());
    drawBackground(ctx);
    drawCells(ctx, cellsBoard);
  });

  gridBtn.addEventListener("click", () => {
    game.toggleGrid();
    if (game.grid) {
      gridBtn.innerHTML = `
      <span style="font-size: 15px; position: relative; top: -1px"
            >&#x2317;</span
          >
          <span style="position: relative; top: -1px">Hide</span>`;
      drawGrid(ctxGrid);
    } else {
      gridBtn.innerHTML = `
      <span style="font-size: 15px; position: relative; top: -1px"
            >&#x2317;</span
          >
          <span style="position: relative; top: -1px">Show</span>`;
      ctxGrid.clearRect(0, 0, WSIZE, HSIZE);
    }
  });

  toggleMode.addEventListener("click", () => {
    const body = document.body;
    if (body.classList.contains("light")) {
      body.classList.remove("light");
      body.classList.add("dark");
      theme.setDarkMode(true);
    } else {
      body.classList.remove("dark");
      body.classList.add("light");
      theme.setDarkMode(false);
    }
    drawBackground(ctx);
    drawCells(ctx, cellsBoard);
  });
}

main();
