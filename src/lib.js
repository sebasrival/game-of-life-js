import {
  CELL_SIZE,
  COLS,
  ROWS,
  BG_COLOR,
  WSIZE,
  HSIZE,
  NEIGHBORS_POS,
  BORDER_COLOR,
} from "./config";
import { CellBuilder } from "./models";

function drawBackground(ctx, color = BG_COLOR) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, WSIZE, HSIZE);
}

function drawGrid(ctx) {
  ctx.beginPath();
  ctx.strokeStyle = BORDER_COLOR;

  for (let y = 0; y <= ROWS; y++) {
    ctx.moveTo(0, y * CELL_SIZE);
    ctx.lineTo(COLS * CELL_SIZE, y * CELL_SIZE);
  }

  for (let x = 0; x <= COLS; x++) {
    ctx.moveTo(x * CELL_SIZE, 0);
    ctx.lineTo(x * CELL_SIZE, ROWS * CELL_SIZE);
  }

  ctx.stroke();
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

function loopGame(ctx, cellsBoard, nextCellsBoard, game) {
  if (game.state !== "start") {
    return;
  }

  for (let x = 0; x < ROWS; x++) {
    for (let y = 0; y < COLS; y++) {
      let countLive = 0;
      for (const [XP, YP] of NEIGHBORS_POS) {
        let nx = x + XP;
        let ny = y + YP;
        if (nx < 0) nx = COLS - 1;
        if (nx === COLS) nx = 0;
        if (ny < 0) ny = ROWS - 1;
        if (ny === ROWS) ny = 0;
        if (cellsBoard[nx][ny].isLive) countLive++;
      }
      const cell = cellsBoard[x][y];
      let nextLive = cell.isLive;
      if (!cell.isLive && countLive === 3) nextLive = true;
      if (cell.isLive && (countLive > 3 || countLive <= 1)) nextLive = false;
      nextCellsBoard[x][y].setIsLive(nextLive);
    }
  }

  [cellsBoard, nextCellsBoard] = [nextCellsBoard, cellsBoard];
  drawBackground(ctx);
  drawCells(ctx, cellsBoard, game.grid);

  window.requestAnimationFrame(() =>
    loopGame(ctx, cellsBoard, nextCellsBoard, game),
  );
}

export {
  initBoard,
  drawBackground,
  drawCells,
  toggleClickCell,
  loopGame,
  drawGrid,
};
