import { CELL_SIZE, COLS, ROWS, WSIZE, HSIZE, NEIGHBORS_POS } from "./config";
import { CellBuilder } from "./models";
import { theme } from "./theme";

function drawBackground(ctx) {
  const colors = theme.getColors();
  ctx.fillStyle = colors.BG_COLOR;
  ctx.fillRect(0, 0, WSIZE, HSIZE);
}

function drawGrid(ctx) {
  const colors = theme.getColors();
  ctx.beginPath();
  ctx.strokeStyle = colors.BORDER_COLOR;

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
  const y = Math.floor((event.clientY - rect.top) / CELL_SIZE); // fila
  const x = Math.floor((event.clientX - rect.left) / CELL_SIZE); // columna

  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
    cells[y][x].toggleLive().draw(ctx);
    if (cells[y][x].isLive) {
      game.addPopulation();
      console.log("clicked cell:", y, x);
    } else {
      game.subtractPopulation();
      console.log("clicked cell:", y, x);
    }
    console.log("clicked cell:", y, x);
  }
};

function loopGame(ctx, cellsBoard, nextCellsBoard, game) {
  if (game.state !== "start") {
    return;
  }
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      let countLive = 0;

      for (const [X, Y] of NEIGHBORS_POS) {
        let nx = x + X;
        let ny = y + Y;

        if (nx < 0) nx = COLS - 1;
        if (nx >= COLS) nx = 0;
        if (ny < 0) ny = ROWS - 1;
        if (ny >= ROWS) ny = 0;

        if (cellsBoard[ny][nx]?.isLive) countLive++;
      }

      const cell = cellsBoard[y][x];
      let nextLive = cell.isLive;

      if (!cell.isLive && countLive === 3) nextLive = true;
      if (cell.isLive && (countLive > 3 || countLive <= 1)) nextLive = false;

      nextCellsBoard[y][x].setIsLive(nextLive);
      if (!cellsBoard[y][x].isLive && nextLive) game.addPopulation();
      if (cellsBoard[y][x].isLive && !nextLive) game.subtractPopulation();
    }
  }

  [cellsBoard, nextCellsBoard] = [nextCellsBoard, cellsBoard];
  drawBackground(ctx);
  drawCells(ctx, cellsBoard, game.grid);
  game.addGeneration();
  window.requestAnimationFrame(() =>
    setTimeout(() => {
      loopGame(ctx, cellsBoard, nextCellsBoard, game);
    }, 30),
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
