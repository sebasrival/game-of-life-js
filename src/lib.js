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

function drawCells(ctx, array = [], gridVisible = true) {
  array.forEach((cells) => {
    cells.forEach((cell) => cell.draw(ctx, gridVisible));
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

function loopGame(ctx, cellsBoard, game) {
  if (game.state === "reset") {
    const newArr = initBoard();
    cellsBoard.length = 0;
    cellsBoard.push(...newArr);
    drawBackground(ctx);
    drawCells(ctx, cellsBoard, game.grid);
    game.setState("idle");
    window.requestAnimationFrame(() => loopGame(ctx, cellsBoard, game));
    return;
  }

  if (game.state !== "start") {
    window.requestAnimationFrame(() => loopGame(ctx, cellsBoard, game));
    return;
  }

  const cellsAux = initBoard();

  for (let x = 0; x < ROWS; x++) {
    for (let y = 0; y < COLS; y++) {
      let countLive = 0;
      for (let vx = -1; vx <= 1; vx++) {
        for (let vy = -1; vy <= 1; vy++) {
          if (vx === 0 && vy === 0) continue;
          let nx = x + vx;
          let ny = y + vy;
          if (nx < 0) nx = COLS - 1;
          if (nx === COLS) nx = 0;
          if (ny < 0) ny = ROWS - 1;
          if (ny === ROWS) ny = 0;
          if (cellsBoard[nx][ny].isLive) countLive++;
        }
      }
      const cell = cellsBoard[x][y];
      let nextLive = cell.isLive;
      if (!cell.isLive && countLive === 3) nextLive = true;
      if (cell.isLive && (countLive > 3 || countLive <= 1)) nextLive = false;
      cellsAux[x][y].setIsLive(nextLive);
    }
  }

  cellsBoard.length = 0;
  cellsBoard.push(...cellsAux);
  drawBackground(ctx);
  drawCells(ctx, cellsBoard, game.grid);

  window.requestAnimationFrame(() => loopGame(ctx, cellsBoard, game));
}

export { initBoard, drawBackground, drawCells, toggleClickCell, loopGame };
