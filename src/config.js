const getViewportHeight = () => {
  if (window.visualViewport) {
    return window.visualViewport.height - 150;
  }
  return window.innerHeight - 150;
};

const WSIZE = window.innerWidth;
const HSIZE = getViewportHeight();

const CELL_SIZE = 8;
const ROWS = Math.floor(HSIZE / CELL_SIZE);
const COLS = Math.floor(WSIZE / CELL_SIZE);

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
