import { Injectable } from '@angular/core';
import { Cell } from '../models/cell.model';
import { BoardConfig } from '../models/boardConfig';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  board: Cell[][] = [];
  private rows: number;
  private cols: number;
  private cellLength: number; // in px
  currentCell: Cell
  startCell: Cell
  exitCell: Cell

  setBoardConfig(config: BoardConfig) {
    this.rows = config.rows
    this.cols = config.cols
    this.cellLength = config.cellLength;
  }

  generateBoard() {
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.board[i][j] = new Cell(i, j, this.cols * i + j, this.cellLength);
      }
    }
    this.startCell = this.board[0][0];
    this.startCell.westWall = false;
    this.exitCell = this.board[this.rows - 1][this.cols - 1]
    this.exitCell.eastWall = false;
    return this.board;
  }

  async generateMaze() {
    const stack: Cell[] = [];
    let initial: Cell = this.board[0][0];
    initial.visited = true;
    stack.push(initial);
    while (stack.length > 0) {
      await this.sleep(1);
      this.currentCell = stack.pop()!;
      let unvisitedNeighbors = this.getUnvisitedNeighbors(this.currentCell);
      if (unvisitedNeighbors.length > 0) {
        stack.push(this.currentCell);
        let chosenOne = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
        this.removeWallBetween(this.currentCell, chosenOne);
        chosenOne.visited = true;
        stack.push(chosenOne);
      }
    }
    this.currentCell = {} as Cell
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getUnvisitedNeighbors(cell: Cell) {
    const neighbors: Cell[] = [];
    if (cell.row - 1 >= 0)
      neighbors.push(this.board[cell.row - 1][cell.col]);
    if (cell.col + 1 < this.cols)
      neighbors.push(this.board[cell.row][cell.col + 1]);
    if (cell.row + 1 < this.rows)
      neighbors.push(this.board[cell.row + 1][cell.col]);
    if (cell.col - 1 >= 0)
      neighbors.push(this.board[cell.row][cell.col - 1]);
    return neighbors.filter(c => !c.visited);
  }

  removeWallBetween(cell1: Cell, cell2: Cell) {
    let dRow = cell1.row - cell2.row;
    let dCol = cell1.col - cell2.col;
    if (dRow == 0) {
      if (dCol == -1) {
        cell1.eastWall = false;
        cell2.westWall = false;
      } else {
        cell1.westWall = false;
        cell2.eastWall = false;
      }
    }
    if (dCol == 0) {
      if (dRow == -1) {
        cell1.southWall = false;
        cell2.northWall = false;
      } else {
        cell1.northWall = false;
        cell2.southWall = false;
      }
    }
  }
}
