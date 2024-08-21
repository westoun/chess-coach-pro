import { Component, OnInit } from '@angular/core';
import { Chessground } from 'chessground';

@Component({
  selector: 'app-move-predictor',
  templateUrl: './move-predictor.component.html',
  styleUrls: ['./move-predictor.component.scss'],
})
export class MovePredictorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const config = {
      movable: {
      }
    };
    const board = document.getElementById('board');

    if (!board) {
      console.error("no board element defined!");
      return;
    }

    const ground = Chessground(board, config);
    // const board = Chessboard('board', 'start');
  }
}
