import { COLOR_LIVE, DEAD_COLOR, CELL_SIZE } from "./config";

// models
class Cell {
  constructor(x, y, size, isLive) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.isLive = isLive;
  }

  draw(ctx) {
    ctx.fillStyle = this.isLive ? COLOR_LIVE : DEAD_COLOR;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.strokeStyle = this.isLive ? null : "grey";
    ctx.strokeRect(this.x, this.y, this.size, this.size);
    return this;
  }

  setIsLive(value) {
    this.isLive = value;
  }

  toggleLive() {
    this.isLive = !this.isLive;
    return this;
  }
}

class CellBuilder {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = CELL_SIZE;
    this.isLive = false;
  }
  setX(x) {
    this.x = x;
    return this;
  }
  setY(y) {
    this.y = y;
    return this;
  }
  setSize(size) {
    this.size = size;
    return this;
  }
  setIsLive(isLive) {
    this.isLive = isLive;
    return this;
  }
  build() {
    return new Cell(this.x, this.y, this.size, this.isLive);
  }
}

class GameState {
  constructor() {
    this.start = false;
    this.generation = 0;
  }
  setStart(value) {
    this.start = value;
  }
  setGeneration(value) {
    this.generation = value;
  }
}

export { CellBuilder, Cell, GameState };
