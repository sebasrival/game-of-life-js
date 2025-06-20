import { WSIZE, HSIZE } from "./config";
import { GameState } from "./models";
import { initBoard, toggleClickCell, drawCells, loopGame, drawBackground } from "./lib";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const gridBtn = document.getElementById("gridBtn");


function main() {
  let scale = 5;

  canvas.width = WSIZE * scale;
  canvas.height = HSIZE * scale;

  canvas.style.width = `${WSIZE}px`;
  canvas.style.height = `${HSIZE}px`;

  ctx.scale(scale, scale);

  const game = new GameState();

  const cellsBoard = initBoard();

  drawCells(ctx, cellsBoard);

  canvas.addEventListener("click", (e) =>
    toggleClickCell(ctx, e, game, cellsBoard),
  );

  startBtn.addEventListener("click", () => {
    game.setState("start");
    startBtn.classList.add("active");
    pauseBtn.classList.remove("active");
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
  });

  gridBtn.addEventListener("click", () => {
    game.toggleGrid();
    if(game.grid) {
      gridBtn.innerHTML = "&#x2317; Hide";
    }else {
      gridBtn.innerHTML = "&#x2317; Show";
    }

    if(game.state !== "start") {
      drawBackground(ctx);
      drawCells(ctx, cellsBoard, game.grid);
    }
  });

  loopGame(ctx, cellsBoard, game);
}

main();
