import { SIZE, CELL_SIZE, COLS, ROWS, BG_COLOR } from "./config";
import { CellBuilder } from "./models";

function drawBackground(ctx, color = BG_COLOR) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, SIZE, SIZE);
}

function initCells(ctx) {
  const cellsArray = [];

  for (let x = 0; x < SIZE; x += CELL_SIZE) {
    for (let y = 0; y < SIZE; y += CELL_SIZE) {
      cellsArray.push(
        new CellBuilder().setX(x).setY(y).setIsLive(false).build().draw(ctx),
      );
    }
  }
  return cellsArray;
}

function drawCells(ctx, array = []) {
  array.forEach((cell) => {
    cell.draw(ctx);
  });
}

const toggleClickCell = (ctx, event, game, cells) => {
  if (game.start) return;
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / CELL_SIZE);
  const y = Math.floor((event.clientY - rect.top) / CELL_SIZE);
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
    const index = x * COLS + y;
    cells[index].toggleLive().draw(ctx);
    console.log(x, y);
    console.log(index);
  }
};

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

function loopGeneration(ctx, cells, game) {
  if (!game.start) {
    window.requestAnimationFrame(() => loopGeneration(ctx, cells, game));
    return;
  }
  const cellsAux = [];
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      const index = x * COLS + y;
      let countLiving = 0;
      // Contar vecinos vivos
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS) {
            const nIndex = nx * COLS + ny;
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
  drawBackground(ctx);
  cells.length = 0;
  cells.push(...cellsAux);
  drawCells(ctx, cells);
  setTimeout(
    () => window.requestAnimationFrame(() => loopGeneration(ctx, cells, game)),
    20,
  );
}

export {
  initCells,
  drawBackground,
  drawCells,
  toggleClickCell,
  loopGeneration,
};
