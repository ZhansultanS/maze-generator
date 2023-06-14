import { Component } from '@angular/core';
import { Cell } from '../models/cell.model';
import { GeneratorService } from '../services/generator.service';
import { BoardConfig } from '../models/boardConfig';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent {

  board: Cell[][] = [];
  boardConfig: BoardConfig

  constructor(public generator: GeneratorService) {
    this.boardConfig = {
      rows: 20,
      cols: 40,
      cellLength: 30
    }
    this.generator.setBoardConfig(this.boardConfig);
    this.board = this.generator.generateBoard();
  }

  setUnvisited() {
    for (let i = 0; i < this.boardConfig.rows; i++) {
      for (let j = 0; j < this.boardConfig.cols; j++) {
        this.board[i][j].visited = false;
      }
    }
  }
}
