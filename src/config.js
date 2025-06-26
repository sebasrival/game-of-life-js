const WSIZE = 1000;
const HSIZE = 1000;

const CELL_SIZE = 10;
const ROWS = HSIZE / CELL_SIZE;
const COLS = WSIZE / CELL_SIZE;

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

export { WSIZE, HSIZE, CELL_SIZE, ROWS, COLS, NEIGHBORS_POS };
