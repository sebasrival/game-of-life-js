import { CELL_SIZE } from "./config";
import { theme } from "./theme";

// models
class Cell {
  constructor(x, y, size, isLive) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.isLive = isLive;
  }

  draw(ctx) {
    const colors = theme.getColors();
    ctx.fillStyle = this.isLive ? colors.COLOR_LIVE : colors.DEAD_COLOR;
    ctx.fillRect(this.x, this.y, this.size, this.size);
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
    this.state = "idle"; // idle | start | pause | reset
    this.generation = 0;
    this.population = 0;
    this.grid = true; // toggle grid visibility
  }
  setState(value) {
    this.state = value;
  }

  setGeneration(value) {
    this.generation = value;
  }

  toggleGrid() {
    this.grid = !this.grid;
  }
}

export { CellBuilder, Cell, GameState };
