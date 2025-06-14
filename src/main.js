import { SIZE } from "./config";
import { GameState } from "./models";
import { initCells, toggleClickCell, loopGeneration } from "./lib";

function main() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const reset = document.getElementById("resetBtn");

  canvas.width = SIZE;
  canvas.height = SIZE;

  const game = new GameState();

  let cells = initCells(ctx);

  canvas.addEventListener("click", (e) => toggleClickCell(ctx, e, game, cells));

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

  loopGeneration(ctx, cells, game);
}

main();
