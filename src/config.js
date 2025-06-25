const WSIZE = 1000;
const HSIZE = 1000;

const CELL_SIZE = 10;
const ROWS = HSIZE / CELL_SIZE;
const COLS = WSIZE / CELL_SIZE;

const BG_COLOR = "#242424";
const BG_COLOR_LIGHT = "white";
const COLOR_LIVE = "#ffffff";
const COLOR_LIVE_LIGHT = "black";
const BORDER_COLOR = "grey";
const DEAD_COLOR = BG_COLOR;

const NEIGHBORS_POS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

export {
  WSIZE,
  HSIZE,
  CELL_SIZE,
  ROWS,
  COLS,
  BG_COLOR,
  COLOR_LIVE,
  DEAD_COLOR,
  BORDER_COLOR,
  BG_COLOR_LIGHT,
  COLOR_LIVE_LIGHT,
  NEIGHBORS_POS,
};
