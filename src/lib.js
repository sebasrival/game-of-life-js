import { CELL_SIZE, COLS, ROWS, BG_COLOR, WSIZE, HSIZE } from "./config";
import { CellBuilder } from "./models";

function drawBackground(ctx, color = BG_COLOR) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, WSIZE, HSIZE);
}

function initBoard() {
  const board = Array.from({ length: ROWS }, (_, y) =>
    Array.from(
      {
        length: COLS,
      },
      (_, x) => {
        return new CellBuilder()
          .setX(x * CELL_SIZE)
          .setY(y * CELL_SIZE)
          .setIsLive(false)
          .build();
      },
    ),
  );
  return board;
}

function drawCells(ctx, array = []) {
  array.forEach((cells) => {
    cells.forEach((cell) => cell.draw(ctx));
  });
}

const toggleClickCell = (ctx, event, game, cells) => {
  if (game.state === "start") return;
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientY - rect.top) / CELL_SIZE);
  const y = Math.floor((event.clientX - rect.left) / CELL_SIZE);
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
    cells[x][y].toggleLive().draw(ctx);
    console.log(x, y);
  }
};

export { initBoard, drawBackground, drawCells, toggleClickCell };
