export class Cell {
  row: number;
  col: number;
  index: number;
  length: number;
  northWall = true;
  eastWall = true;
  southWall = true;
  westWall = true;
  visited = false;

  constructor(row: number, col: number, index: number, length: number) {
    this.row = row;
    this.col = col;
    this.length = length;
    this.index = index;
  }
}
